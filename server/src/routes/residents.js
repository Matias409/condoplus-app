import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Initialize Supabase Admin Client
// We need the SERVICE_ROLE_KEY to bypass RLS and invite users
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// POST /api/residents/invite
router.post('/invite', async (req, res) => {
    try {
        const { email, full_name, rut, unit_id, phone, user_type } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        console.log('Inviting user:', email);

        // 1. Invite user via Supabase Auth
        // This sends an email to the user with a link to set their password
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
            data: {
                full_name,
                role: 'resident' // Metadata
            }
        });

        if (authError) {
            console.error('Supabase Invite Error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        console.log('User invited successfully:', authData.user.id);

        // 2. Update/Upsert the public.users profile
        // We do this immediately to ensure the user has a profile even before they accept the invite
        const { error: profileError } = await supabaseAdmin
            .from('users')
            .upsert({
                id: authData.user.id,
                email: email,
                full_name: full_name,
                rut: rut,
                unit_id: unit_id,
                phone: phone,
                user_type: user_type,
                role: 'resident',
                status: 'Activo' // Or 'Pendiente'
            });

        if (profileError) {
            console.error('Profile Update Error:', profileError);
            return res.status(500).json({ error: 'User invited but profile update failed: ' + profileError.message });
        }

        res.json({ message: 'Invitación enviada correctamente', user: authData.user });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/residents/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'User ID is required' });

        console.log('Deleting user:', id);

        // 1. Delete from Supabase Auth
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

        if (authError) {
            console.error('Supabase Delete Error:', authError);
            return res.status(400).json({ error: authError.message });
        }

        // 2. Delete from public.users (explicitly, though auth cascade might handle it)
        const { error: profileError } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', id);

        if (profileError) {
            console.error('Profile Delete Error:', profileError);
        }

        res.json({ message: 'Usuario eliminado correctamente' });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
