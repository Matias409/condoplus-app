# Manual de Usuario - CondoPlus

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Inicio de Sesión](#inicio-de-sesión)
3. [Panel de Administrador](#panel-de-administrador)
   - [Dashboard Administrativo](#dashboard-administrativo)
   - [Finanzas](#finanzas)
   - [Residentes](#residentes)
   - [Incidencias](#incidencias)
   - [Comunicaciones](#comunicaciones)
   - [Votaciones](#votaciones)
4. [Panel de Residente](#panel-de-residente)
   - [Dashboard de Residente](#dashboard-de-residente)
   - [Mis Pagos](#mis-pagos)
   - [Reservas de Espacios](#reservas-de-espacios)
   - [Generación de QR](#generación-de-qr)
   - [Mis Incidencias](#mis-incidencias)
   - [Comunicaciones](#comunicaciones-residentes)
   - [Votaciones](#votaciones-residentes)
   - [Ayuda](#ayuda)
5. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

**CondoPlus** es una plataforma SaaS (Software as a Service) diseñada específicamente para facilitar la gestión integral de condominios en Chile. La plataforma ofrece herramientas completas tanto para administradores como para residentes, optimizando la comunicación, administración financiera, gestión de incidencias, reserva de espacios comunes y participación en votaciones.

### Tipos de Usuario

La plataforma cuenta con dos tipos de usuarios principales:

1. **Administrador**: Tiene acceso completo a todas las funcionalidades de gestión del condominio, incluyendo finanzas, residentes, incidencias, comunicaciones y votaciones.

2. **Residente**: Tiene acceso a funcionalidades personales como consulta de pagos, reserva de espacios, reporte de incidencias, generación de códigos QR para visitantes y participación en votaciones.

### Acceso a la Plataforma

Para acceder a CondoPlus, necesitará:
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- Credenciales de acceso proporcionadas por su administración
- Conexión a Internet estable

---

## Inicio de Sesión

### Acceder al Sistema

1. Abra su navegador web y visite la URL de CondoPlus proporcionada por su administración
2. Verá la pantalla de inicio de sesión
3. Ingrese sus credenciales:
   - **Correo electrónico**: El email registrado en el sistema
   - **Contraseña**: Su contraseña personal

4. Haga clic en el botón **"Iniciar Sesión"**

### Recuperación de Contraseña

Si olvidó su contraseña:

1. En la pantalla de inicio de sesión, haga clic en "¿Olvidó su contraseña?"
2. Ingrese su correo electrónico registrado
3. Recibirá un enlace de recuperación en su correo
4. Siga las instrucciones del correo para crear una nueva contraseña

### Primer Acceso

En su primer acceso al sistema:

1. Utilice las credenciales provisionales proporcionadas por el administrador
2. Se recomienda cambiar su contraseña inmediatamente después del primer inicio de sesión
3. Complete su perfil con información de contacto actualizada

**Importante**: Mantenga sus credenciales seguras y no las comparta con terceros.

---

## Panel de Administrador

El panel de administrador proporciona acceso completo a todas las herramientas de gestión del condominio.

### Dashboard Administrativo

El dashboard es la vista principal del administrador y proporciona una visión general del estado del condominio.

#### Características Principales

**Tarjetas de Estadísticas**:
- **Ingresos del Mes**: Muestra el total de ingresos mensuales con comparación respecto al mes anterior
- **Total Residentes**: Cantidad de residentes registrados en el condominio
- **Incidencias Activas**: Número de problemas pendientes de resolución
- **Tasa de Ocupación**: Porcentaje de unidades ocupadas

**Gráfico de Ingresos**:
- Visualización mensual de los ingresos del condominio
- Permite identificar tendencias y patrones de pago
- Datos presentados en formato de gráfico de barras

**Actividad Reciente**:
- Lista de las últimas actividades en el condominio
- Incluye pagos realizados, nuevas incidencias reportadas y reservas de espacios
- Cada actividad muestra: usuario, acción, objetivo y tiempo transcurrido

#### Navegación

Desde el dashboard puede acceder a cualquier módulo usando el menú lateral:
- Finanzas
- Residentes
- Incidencias
- Comunicaciones
- Votaciones

---

### Finanzas

El módulo de finanzas permite gestionar todos los aspectos económicos del condominio.

#### Crear un Nuevo Gasto Común

1. Haga clic en el botón **"+ Crear Gasto Común"**
2. Complete el formulario:
   - **Concepto**: Descripción del gasto (ej: "Gastos Comunes Diciembre 2025")
   - **Monto**: Valor en pesos chilenos
   - **Fecha de Vencimiento**: Fecha límite de pago
   - **Tipo**: Seleccione entre:
     - Gasto Común
     - Mantenimiento
     - Seguridad
     - Servicios
     - Extraordinario
3. Seleccione los residentes que deben pagar:
   - Use los checkboxes para seleccionar residentes específicos
   - O use "Seleccionar Todos" para aplicar a todo el condominio
4. Haga clic en **"Crear Gastos"**
5. El sistema generará automáticamente los cargos para cada residente seleccionado

#### Gestionar Pagos

**Ver Estado de Pagos**:
- La tabla principal muestra todos los pagos registrados
- Columnas incluyen: Residente, Unidad, Concepto, Monto, Estado y Fecha de Vencimiento
- Estados posibles:
  - **Pendiente** (amarillo): Pago no realizado
  - **Pagado** (verde): Pago completado
  - **Vencido** (rojo): Fecha de vencimiento superada

**Filtros Disponibles**:
- **Estado**: Filtrar por Todos, Pendientes, Pagados o Vencidos
- **Mes**: Seleccionar mes específico
- **Tipo**: Filtrar por tipo de gasto

**Búsqueda**:
- Use la barra de búsqueda para encontrar pagos por nombre de residente o concepto

**Acciones sobre Pagos**:

1. **Editar Monto**:
   - Haga clic en el ícono de lápiz junto al pago
   - Modifique el monto
   - Confirme el cambio

2. **Eliminar Pago**:
   - Haga clic en el ícono de basura
   - Confirme la eliminación

3. **Eliminar Múltiples Pagos**:
   - Seleccione los pagos usando los checkboxes
   - Haga clic en **"Eliminar Seleccionados"**
   - Confirme la acción

#### Estadísticas Financieras

El panel superior muestra:
- **Total por Cobrar**: Suma de todos los pagos pendientes y vencidos
- **Total Cobrado**: Suma de pagos completados
- **Pagos Vencidos**: Cantidad y monto de pagos fuera de plazo

#### Exportar Datos

Para exportar información financiera:
1. Configure los filtros deseados
2. Haga clic en el botón **"Exportar"**
3. Seleccione el formato (Excel, PDF)
4. El archivo se descargará automáticamente

---

### Residentes

El módulo de residentes permite administrar toda la información de los habitantes del condominio.

#### Ver Lista de Residentes

La vista principal muestra tarjetas con la información de cada residente:
- **Nombre completo**
- **Unidad/Departamento**
- **Correo electrónico**
- **Teléfono**
- **Estado**: Activo o Inactivo

#### Buscar Residentes

Use la barra de búsqueda en la parte superior para encontrar residentes por:
- Nombre
- Unidad
- Correo electrónico

#### Crear Nuevo Residente

1. Haga clic en el botón **"+ Agregar Residente"**
2. Complete el formulario con la siguiente información:
   - **Nombre**: Nombre completo del residente
   - **RUT**: RUT chileno (formato: 12.345.678-9)
   - **Correo Electrónico**: Email válido (se usará para acceso al sistema)
   - **Teléfono**: Número de contacto
   - **Unidad**: Número de departamento o casa
   - **Contraseña**: Contraseña provisional para el primer acceso
3. Haga clic en **"Crear Residente"**
4. El sistema creará automáticamente:
   - Una cuenta de usuario para el residente
   - Acceso al portal de residentes
   - Envío de credenciales por correo electrónico

**Importante**: Informe al residente sobre sus credenciales y recomiende cambiar la contraseña en el primer acceso.

#### Editar Información de Residente

1. Localice la tarjeta del residente que desea editar
2. Haga clic en el ícono de lápiz (editar)
3. Modifique los campos necesarios:
   - Nombre
   - RUT
   - Correo electrónico
   - Teléfono
   - Unidad
4. Haga clic en **"Actualizar"** para guardar los cambios

**Nota**: No es necesario ingresar la contraseña a menos que desee cambiarla.

#### Consideraciones Importantes

- Cada unidad puede tener múltiples residentes asociados
- El correo electrónico debe ser único en el sistema
- El RUT debe ser válido y único
- Los cambios en el correo electrónico afectan el acceso del residente

---

### Incidencias

El módulo de incidencias permite gestionar problemas y solicitudes reportadas por los residentes.

#### Vista Kanban

Las incidencias se organizan en un tablero Kanban con tres columnas:

1. **Reportado** (amarillo): Incidencias nuevas sin atender
2. **En Proceso** (azul): Incidencias en curso de resolución
3. **Resuelta** (verde): Incidencias completadas

#### Información de cada Incidencia

Cada tarjeta muestra:
- **Título**: Descripción breve del problema
- **Prioridad**: Alta (rojo), Media (amarillo) o Baja (verde)
- **Ubicación**: Lugar donde ocurre el problema
- **Reportado por**: Nombre del residente que reportó
- **Fecha**: Cuándo se reportó

#### Gestionar Incidencias

**Ver Detalles**:
1. Haga clic en cualquier tarjeta de incidencia
2. Se abrirá un modal con información completa:
   - Título y descripción detallada
   - Prioridad
   - Ubicación
   - Estado actual
   - Residente que reportó
   - Fecha de reporte

**Cambiar Estado**:
1. Abra los detalles de la incidencia
2. Seleccione el nuevo estado en el menú desplegable:
   - Reportado
   - En Proceso
   - Resuelta
3. Opcionalmente agregue un comentario sobre el cambio
4. Haga clic en **"Actualizar"**

**Cambiar Prioridad**:
1. En los detalles de la incidencia
2. Modifique la prioridad según la urgencia:
   - **Alta**: Problemas críticos que requieren atención inmediata
   - **Media**: Problemas importantes pero no urgentes
   - **Baja**: Problemas menores o mejoras
3. Guarde los cambios

#### Comunicación con Residentes

Para responder a una incidencia:
1. Abra los detalles
2. Use la sección de comentarios para comunicarse con el residente
3. El residente recibirá una notificación de la actualización

#### Mejores Prácticas

- Actualice el estado regularmente para mantener informados a los residentes
- Use comentarios para explicar el progreso o solicitar información adicional
- Resuelva incidencias de alta prioridad primero
- Archive incidencias resueltas después de confirmar la satisfacción del residente

---

### Comunicaciones

El módulo de comunicaciones permite enviar anuncios y mensajes a los residentes del condominio.

#### Ver Comunicaciones Existentes

La vista principal muestra todas las comunicaciones enviadas con:
- **Título**: Asunto del comunicado
- **Tipo**: Categoría del mensaje
- **Destinatarios**: A quién se envió
- **Fecha**: Cuándo se publicó
- **Estado**: Publicado o Borrador

#### Crear Nueva Comunicación

1. Haga clic en el botón **"+ Nueva Comunicación"**
2. Complete el formulario:

   **Información Básica**:
   - **Título**: Asunto del comunicado (ej: "Corte de agua programado")
   - **Tipo**: Seleccione la categoría:
     - **Urgente**: Para emergencias o información crítica
     - **Mantenimiento**: Trabajos y reparaciones programadas
     - **Evento**: Actividades sociales o reuniones
     - **General**: Información general del condominio

   **Destinatarios**:
   - **Todas las Torres**: Enviar a todo el condominio
   - **Torre específica**: Seleccione una torre particular
   - **Residentes específicos**: Seleccione individuos

   **Contenido**:
   - **Mensaje**: Escriba el contenido completo del comunicado
   - Use un lenguaje claro y conciso
   - Incluya fechas, horarios y detalles importantes

3. Haga clic en **"Enviar Comunicación"**

#### Tipos de Comunicación y Su Uso

**Urgente**:
- Cortes de servicios (agua, luz, gas)
- Emergencias o situaciones de seguridad
- Cambios inmediatos en el funcionamiento

**Mantenimiento**:
- Trabajos programados en áreas comunes
- Fumigaciones
- Limpieza de estanques
- Mantención de ascensores

**Evento**:
- Juntas de vecinos
- Celebraciones del condominio
- Actividades comunitarias
- Asambleas extraordinarias

**General**:
- Recordatorios de gastos comunes
- Nuevas normativas
- Información administrativa
- Actualizaciones de servicios

#### Editar o Eliminar Comunicaciones

**Editar**:
1. Localice la comunicación en la lista
2. Haga clic en el ícono de edición
3. Modifique los campos necesarios
4. Guarde los cambios

**Eliminar**:
1. Haga clic en el ícono de tres puntos
2. Seleccione "Eliminar"
3. Confirme la acción

**Nota**: Solo se pueden editar comunicaciones en estado de borrador. Las publicadas quedan como registro histórico.

#### Consejos para Comunicaciones Efectivas

- **Sea claro y conciso**: Vaya directo al punto
- **Use títulos descriptivos**: El título debe resumir el contenido
- **Incluya fechas y horarios específicos**: Evite ambigüedades
- **Envíe con anticipación**: Notifique eventos con tiempo suficiente
- **Seleccione el tipo correcto**: Ayuda a los residentes a priorizar la lectura

---

### Votaciones

El módulo de votaciones permite crear y gestionar procesos de votación para decisiones del condominio.

#### Ver Votaciones

La vista principal muestra todas las votaciones con:
- **Título**: Tema a votar
- **Estado**: Activa, Finalizada o Próxima
- **Participación**: Porcentaje de residentes que han votado
- **Fecha límite**: Cuándo cierra la votación
- **Resultados parciales** (solo para administradores)

#### Crear Nueva Votación

1. Haga clic en **"+ Nueva Votación"**
2. Complete el formulario:

   **Información de la Votación**:
   - **Título**: Tema a decidir (ej: "Cambio de color de fachada")
   - **Descripción**: Contexto y detalles de la decisión
   - **Fecha de inicio**: Cuándo comienza la votación
   - **Fecha de cierre**: Fecha límite para votar

   **Opciones de Votación**:
   - Agregue al menos 2 opciones usando el botón **"+ Agregar Opción"**
   - Puede incluir múltiples opciones según sea necesario
   - Para eliminar una opción, haga clic en el ícono X

   **Configuración**:
   - **Votación anónima**: Active si los votos deben ser confidenciales
   - **Quórum requerido**: Defina el porcentaje mínimo de participación

3. Haga clic en **"Crear Votación"**

#### Monitorear Votaciones Activas

Durante una votación activa puede:

**Ver Participación en Tiempo Real**:
- Porcentaje de residentes que han votado
- Cantidad total de votos emitidos vs. votantes habilitados

**Ver Resultados Parciales**:
- Distribución de votos por opción
- Gráfico de barras con porcentajes

**Enviar Recordatorios**:
- Use el módulo de comunicaciones para recordar a residentes que voten
- Se recomienda enviar recordatorios 3 y 1 día antes del cierre

#### Cerrar Votación

**Cierre Automático**:
- Las votaciones se cierran automáticamente en la fecha límite establecida

**Cierre Manual**:
1. Localice la votación activa
2. Haga clic en **"Cerrar Votación"**
3. Confirme la acción
4. La votación pasará a estado "Finalizada"

**Importante**: Una vez cerrada, no se pueden agregar más votos.

#### Ver Resultados Finales

Después de cerrar una votación:
1. Haga clic en la votación finalizada
2. Verá:
   - Opción ganadora
   - Distribución completa de votos
   - Porcentaje de participación
   - Lista de votantes (si no es anónima)
3. Puede exportar los resultados en PDF

#### Buenas Prácticas

- **Defina plazos razonables**: Mínimo 7 días para dar tiempo suficiente
- **Describa claramente el tema**: Incluya toda la información relevante
- **Opciones mutuamente excluyentes**: Asegúrese de que las opciones sean claras
- **Comunique los resultados**: Publique los resultados en el módulo de comunicaciones
- **Use quórum apropiado**: Típicamente 51% para decisiones importantes

---

## Panel de Residente

El panel de residente proporciona acceso a funcionalidades personales y de autogestión.

### Dashboard de Residente

El dashboard es la vista principal del residente con un resumen de su situación en el condominio.

#### Tarjetas de Estado

**Próximo Pago**:
- Muestra el monto del próximo gasto común a pagar
- Fecha de vencimiento
- Estado: Pendiente, Al día o Vencido
- Botón de acceso rápido para pagar

**Mis Incidencias**:
- Cantidad de incidencias activas que ha reportado
- Estado de cada una (Abierta, En Proceso, Resuelta)
- Acceso rápido para ver todas

**Próxima Reserva**:
- Información de su próxima reserva de espacio común
- Espacio reservado
- Fecha y hora
- Estado de confirmación

**Visitas Este Mes**:
- Cantidad de visitas registradas en el mes
- Visitas activas actualmente
- Acceso rápido para generar nuevo QR

#### Comunicados Recientes

Lista de los últimos 3-5 comunicados del condominio:
- Cada comunicado muestra:
  - Tipo (Urgente, Mantenimiento, Evento, General)
  - Título
  - Vista previa del contenido
  - Fecha de publicación
- Haga clic en "Ver todos" para acceder a comunicados históricos

---

### Mis Pagos

El módulo de pagos permite consultar y gestionar los gastos comunes y otros cargos.

#### Ver Estado de Cuenta

La vista principal muestra:

**Resumen Financiero**:
- **Saldo Pendiente**: Total a pagar
- **Último Pago**: Fecha y monto del último pago realizado
- **Próximo Vencimiento**: Fecha del próximo pago

**Historial de Pagos**:
Tabla con todos los cargos y pagos:
- **Fecha de Vencimiento**
- **Concepto**: Descripción del cargo
- **Monto**: Valor en pesos
- **Estado**: Pendiente, Pagado o Vencido
- **Fecha de Pago**: Cuándo se realizó el pago (si aplica)

#### Filtrar Pagos

Use los filtros disponibles para encontrar información específica:
- **Por Estado**: Todos, Pendientes, Pagados, Vencidos
- **Por Mes**: Seleccione un mes específico
- **Por Año**: Filtre por año

#### Realizar un Pago

**Opción 1: Pago Simulado (Demo)**
1. Seleccione un pago pendiente
2. Haga clic en **"Pagar Ahora"**
3. El sistema marcará el pago como completado

**Opción 2: Pago Real (Producción)**
1. Seleccione el pago pendiente
2. Haga clic en **"Pagar Ahora"**
3. Será redirigido a la pasarela de pago integrada
4. Complete el proceso de pago con:
   - Tarjeta de crédito/débito
   - Transferencia bancaria
   - Otros métodos disponibles
5. Recibirá confirmación por email

#### Descargar Comprobantes

Para obtener un comprobante de pago:
1. Localice el pago en la tabla
2. Haga clic en el ícono de descarga
3. Se generará un PDF con:
   - Información del condominio
   - Datos del residente
   - Detalles del pago
   - Fecha y monto
   - Número de comprobante

#### Ver Detalles de un Pago

1. Haga clic en cualquier pago de la tabla
2. Se abrirá un modal con información detallada:
   - Concepto completo
   - Monto original
   - Fecha de cargo
   - Fecha de vencimiento
   - Fecha de pago (si aplica)
   - Método de pago utilizado
   - Número de comprobante

---

### Reservas de Espacios

El módulo de reservas permite solicitar espacios comunes del condominio de manera simple y visual.

#### Espacios Disponibles

Los espacios comunes típicamente incluyen:

**Quincho**:
- Capacidad: 30 personas
- Horario: 10:00 - 00:00
- Costo: Según tarifa del condominio
- Incluye: Parrillas, mesas, sillas

**Salón de Eventos**:
- Capacidad: 50-100 personas
- Horario: 09:00 - 01:00
- Incluye: Mesas, sillas, cocina

**Sala Multiuso**:
- Capacidad: 15-20 personas
- Para reuniones, cumpleaños pequeños
- Incluye: TV, proyector

**Cancha Deportiva**:
- Para fútbol, básquetbol
- Horario diurno
- Incluido en gastos comunes

**Piscina** (temporada de verano):
- Disponible solo en meses de verano
- Reserva por horarios
- Incluido en gastos comunes

#### Ver Calendario de Disponibilidad

La vista de calendario muestra:

**Vista por Día**:
1. Seleccione un espacio de la lista
2. Seleccione una fecha en el calendario
3. Verá una línea de tiempo con:
   - **Franjas verdes**: Horarios disponibles
   - **Franjas rojas**: Horarios ocupados
   - Cada franja muestra el horario (ej: 10:00 - 12:00)

**Navegación**:
- Use las flechas para cambiar de mes
- Haga clic en cualquier día para ver su disponibilidad
- Los días con reservas se marcan con un punto

#### Crear una Reserva

1. **Seleccione el Espacio**:
   - Haga clic en la tarjeta del espacio deseado
   - Se abrirá el formulario de reserva

2. **Complete la Información**:
   - **Fecha**: Seleccione el día deseado en el calendario
   - **Hora de Inicio**: Seleccione la hora de inicio (según disponibilidad)
   - **Hora de Término**: Seleccione la hora de finalización
   - **Cantidad de Personas**: Número estimado de asistentes
   - **Motivo** (opcional): Descripción del evento

3. **Verificar Disponibilidad**:
   - El sistema validará automáticamente que el horario esté libre
   - Si hay conflicto, se mostrará un mensaje de error

4. **Confirmar Reserva**:
   - Revise la información
   - Lea las condiciones de uso del espacio
   - Haga clic en **"Confirmar Reserva"**
   - Recibirá una confirmación por correo electrónico

#### Mis Reservas

**Ver Reservas Activas**:
- Sección "Mis Reservas" muestra todas sus reservas futuras
- Para cada reserva verá:
  - Espacio reservado
  - Fecha y horario
  - Estado (Confirmada, Pendiente)
  - Cantidad de personas

**Cancelar una Reserva**:
1. Localice la reserva en "Mis Reservas"
2. Haga clic en **"Cancelar"**
3. Confirme la cancelación
4. **Importante**: Revisar política de cancelación del condominio

#### Políticas y Reglas

**Anticipación Mínima**:
- Generalmente se requiere reservar con al menos 24-48 horas de anticipación
- Algunas instalaciones pueden requerir más tiempo

**Duración Máxima**:
- Cada espacio tiene un límite de horas por reserva
- Consulte las reglas específicas de cada espacio

**Horarios Permitidos**:
- Respete los horarios establecidos
- Considere las normas de ruido del condominio

**Costos**:
- Algunos espacios tienen costo adicional
- Otros están incluidos en los gastos comunes
- El costo se mostrará al momento de reservar

**Responsabilidades**:
- Mantener el espacio limpio y en orden
- Reportar cualquier daño inmediatamente
- Respetar el horario reservado

---

### Generación de QR

El módulo de QR permite generar códigos QR para visitantes, facilitando el acceso seguro al condominio.

#### Crear Código QR para Visita

1. **Haga clic en "Generar Nuevo QR"**

2. **Seleccione el Tipo de Visita**:
   - **Visita Social**: Familiares, amigos
   - **Delivery**: Servicios de entrega
   - **Servicio Técnico**: Plomeros, electricistas, etc.
   - **Otro**: Otros tipos de visitas

3. **Complete la Información del Visitante**:
   - **Nombre completo**: Nombre de la persona que visitará
   - **RUT/Identificación**: Documento de identidad
   - **Teléfono**: Número de contacto del visitante
   - **Patente** (opcional): Si viene en vehículo

4. **Configure la Validez**:
   - **Fecha**: Día de la visita
   - **Hora de inicio**: Desde cuándo es válido el QR
   - **Hora de término**: Hasta cuándo es válido el QR
   - **Tipo de validez**:
     - **Uso único**: Se invalida al ingresar
     - **Múltiples usos**: Válido para entrar y salir durante el período

5. **Genere el Código**:
   - Haga clic en **"Generar QR"**
   - El código QR se mostrará en pantalla

#### Compartir el Código QR

Una vez generado el QR, tiene varias opciones para compartirlo:

**Opción 1: WhatsApp**
1. Haga clic en el botón de WhatsApp
2. Seleccione el contacto
3. El QR se enviará automáticamente con un mensaje predefinido

**Opción 2: Email**
1. Haga clic en el botón de Email
2. Se abrirá su cliente de correo
3. El QR estará adjunto
4. Complete el destinatario y envíe

**Opción 3: Descargar**
1. Haga clic en **"Descargar QR"**
2. Se descargará como imagen PNG
3. Puede enviarlo por cualquier medio (SMS, Telegram, etc.)

**Opción 4: Imprimir**
- Desde la vista del QR, use la función de impresión del navegador
- Útil para visitas recurrentes o servicios programados

#### Gestionar Códigos QR Activos

**Ver Historial de Visitas**:
- La tabla muestra todas las visitas generadas
- Información visible:
  - Nombre del visitante
  - Fecha y hora de visita
  - Estado (Activo, Usado, Expirado)
  - Hora de ingreso/salida real

**Estados de QR**:
- **Activo** (verde): QR válido y disponible para usar
- **Usado** (azul): Visitante ha ingresado
- **Expirado** (gris): Venció el plazo de validez
- **Cancelado** (rojo): QR anulado manualmente

**Cancelar un QR**:
1. Localice el QR en la lista
2. Haga clic en **"Cancelar"**
3. Confirme la anulación
4. El QR quedará invalidado inmediatamente

#### Funcionalidades del Sistema de QR

**Para el Guardia/Portero**:
- Escanea el QR con su dispositivo
- El sistema verifica:
  - Validez del código
  - Fecha y hora permitida
  - Datos del visitante
  - Unidad que autorizó
- Registra automáticamente ingreso y salida

**Seguridad**:
- Cada QR es único y encriptado
- No se puede falsificar o reutilizar (si es de uso único)
- Registro completo de accesos
- Notificación al residente cuando el visitante ingresa

#### Consejos de Uso

- **Genere QR con anticipación**: No espere hasta el último momento
- **Verifique la información**: Asegúrese de que los datos sean correctos
- **Configure horarios realistas**: Considere posibles retrasos
- **Para servicios regulares**: Genere QR con validez extendida
- **Cancele QR no utilizados**: Mantenga la seguridad cancelando QR de visitas canceladas

---

### Mis Incidencias

El módulo de incidencias permite reportar y dar seguimiento a problemas en el condominio.

#### Reportar una Nueva Incidencia

1. **Haga clic en "+ Reportar Incidencia"**

2. **Complete el Formulario**:
   - **Título**: Resumen breve del problema (ej: "Filtración en baño")
   - **Descripción**: Detalle completo del problema:
     - ¿Qué ocurre exactamente?
     - ¿Desde cuándo?
     - ¿Ha empeorado?
     - Cualquier información relevante
   
   - **Ubicación**: Dónde se presenta el problema:
     - Si es en su unidad: número de unidad
     - Si es en áreas comunes: especifique (pasillo, ascensor, estacionamiento, etc.)
   
   - **Prioridad**:
     - **Alta**: Problemas urgentes (filtraciones graves, cortes de servicios, peligros)
     - **Media**: Problemas importantes pero no urgentes
     - **Baja**: Mejoras o problemas menores
   
   - **Fotografías** (opcional pero recomendado):
     - Adjunte fotos del problema
     - Ayuda al administrador a entender mejor la situación

3. **Enviar Reporte**:
   - Revise la información
   - Haga clic en **"Enviar Incidencia"**
   - Recibirá confirmación por email

#### Ver Mis Incidencias

**Vista de Lista**:
- Todas sus incidencias reportadas
- Para cada incidencia verá:
  - Título
  - Estado actual
  - Prioridad
  - Fecha de reporte
  - Última actualización

**Filtros**:
- **Por Estado**: Todas, Reportadas, En Proceso, Resueltas
- **Por Prioridad**: Todas, Alta, Media, Baja

#### Seguimiento de Incidencias

**Ver Detalles y Progreso**:
1. Haga clic en cualquier incidencia de la lista
2. Verá:
   - Información completa del reporte
   - Estado actual
   - Comentarios del administrador
   - Historial de cambios
   - Fotografías adjuntas

**Comentarios y Comunicación**:
- Puede agregar comentarios para dar más información
- Recibirá notificaciones cuando el administrador actualice el estado
- Use los comentarios para:
  - Agregar detalles adicionales
  - Responder preguntas del administrador
  - Reportar cambios en la situación

**Estados de una Incidencia**:

1. **Reportado** (amarillo):
   - Incidencia recién creada
   - Esperando revisión del administrador
   - Generalmente se revisa en 24-48 horas

2. **En Proceso** (azul):
   - El administrador está trabajando en la solución
   - Puede incluir:
     - Coordinación con técnicos
     - Solicitud de presupuestos
     - Programación de visitas

3. **Resuelta** (verde):
   - El problema ha sido solucionado
   - Puede confirmar la resolución o reabrir si persiste

#### Cerrar una Incidencia

Cuando la incidencia esté resuelta:
1. Verifique que el problema esté efectivamente solucionado
2. En los detalles, haga clic en **"Confirmar Resolución"**
3. Opcionalmente agregue un comentario de satisfacción
4. La incidencia se archivará

**Si el problema persiste**:
- Agregue un comentario explicando que no está resuelto
- El administrador la reabrirá y continuará trabajando en ella

#### Consejos para Reportar Incidencias Efectivas

**Sea Específico**:
- "Filtración en techo del baño" es mejor que "Problema en el baño"
- Incluya detalles como: ubicación exacta, frecuencia, intensidad

**Use Prioridades Correctamente**:
- Alta: Solo para emergencias reales
- Media: Mayoría de problemas comunes
- Baja: Mejoras o problemas estéticos

**Adjunte Fotografías**:
- Una imagen vale más que mil palabras
- Facilita el diagnóstico y la solución

**Responda Rápidamente**:
- Si el administrador solicita información adicional, responda pronto
- Esto acelera la resolución

**Sea Paciente**:
- Algunos problemas requieren coordinación con proveedores externos
- El administrador está trabajando en todas las incidencias

---

### Comunicaciones (Residentes)

Este módulo permite acceder a todos los anuncios y comunicados del condominio.

#### Ver Comunicaciones

**Vista Principal**:
- Lista de todos los comunicados ordenados por fecha (más recientes primero)
- Cada comunicado muestra:
  - Categoría de comunicado (Urgente, Mantenimiento, Evento, General)
  - Título descriptivo
  - Vista previa del contenido
  - Fecha de publicación
  - Cantidad de residentes que lo han leído

#### Tipos de Comunicados

**Urgente** (rojo):
- Información crítica que requiere atención inmediata
- Ejemplos: Cortes de servicios, emergencias, cambios importantes
- **Recomendación**: Lea estos comunicados de inmediato

**Mantenimiento** (naranja):
- Trabajos programados en el condominio
- Ejemplos: Fumigación, pintura, reparaciones
- **Recomendación**: Tome nota de fechas y horarios

**Evento** (verde):
- Actividades sociales o reuniones
- Ejemplos: Juntas de vecinos, celebraciones, actividades comunitarias
- **Recomendación**: Marque en su calendario si planea asistir

**General** (azul):
- Información administrativa o general
- Ejemplos: Recordatorios, nuevas normas, actualizaciones
- **Recomendación**: Lea con calma

#### Leer un Comunicado

1. Haga clic en cualquier comunicado de la lista
2. Se abrirá el contenido completo
3. Información visible:
   - Título completo
   - Fecha y hora de publicación
   - Tipo de comunicado
   - Contenido completo con todos los detalles
   - Remitente (administración o comité)

#### Buscar Comunicados

Use la barra de búsqueda para encontrar comunicados específicos:
- Por palabras clave en el título
- Por contenido
- Por tipo de comunicado

#### Filtrar Comunicados

**Por Tipo**:
- Seleccione el tipo específico para ver solo esos comunicados
- Útil para ver solo eventos próximos o mensajes urgentes

**Por Fecha**:
- Comunicados del último mes
- Comunicados históricos
- Rango de fechas personalizado

#### Notificaciones

**Recepción de Nuevos Comunicados**:
- Recibirá notificación por email cuando haya comunicados nuevos
- Los comunicados urgentes generan notificación push (si tiene la app móvil)

**Gestionar Preferencias de Notificación**:
- Configure qué tipos de comunicados quiere recibir por email
- Puede activar/desactivar notificaciones push

---

### Votaciones (Residentes)

El módulo de votaciones permite participar en decisiones del condominio.

#### Ver Votaciones Disponibles

**Votaciones Activas**:
- Lista de votaciones en curso en las que puede participar
- Para cada votación verá:
  - Título del tema a decidir
  - Descripción completa
  - Opciones disponibles
  - Fecha límite para votar
  - Su estado de participación (Pendiente o Votado)

**Votaciones Finalizadas**:
- Resultados de votaciones cerradas
- Muestra la opción ganadora
- Porcentaje de participación

#### Participar en una Votación

1. **Acceda a la Votación**:
   - Haga clic en una votación activa
   - Lea cuidadosamente la descripción y contexto

2. **Revise las Opciones**:
   - Lea todas las opciones disponibles
   - Considere las implicaciones de cada una

3. **Emita su Voto**:
   - Seleccione su opción preferida
   - Haga clic en **"Confirmar Voto"**
   - El sistema solicitará confirmación

4. **Confirme su Elección**:
   - Revise su selección
   - Haga clic en **"Sí, confirmar mi voto"**
   - **Importante**: Una vez confirmado, no puede cambiar su voto

#### Verificar su Participación

Después de votar:
- El sistema confirmará que su voto fue registrado
- Recibirá un email de confirmación
- La votación se marcará como "Votado" en su lista
- Puede ver resultados parciales (si la votación no es anónima)

#### Ver Resultados

**Durante la Votación**:
- Si la votación no es anónima, puede ver resultados parciales
- Muestra porcentajes de cada opción
- Útil para ver tendencias

**Después del Cierre**:
1. Acceda a la votación finalizada
2. Verá:
   - Opción ganadora destacada
   - Distribución completa de votos
   - Porcentaje y cantidad de votos por opción
   - Participación total
   - Su voto (si no fue anónima)

#### Recordatorios

**Notificaciones de Votaciones**:
- Recibirá email cuando se cree una nueva votación
- Recordatorios antes del cierre:
  - 3 días antes
  - 1 día antes
  - 6 horas antes (para votaciones urgentes)

#### Importancia de Participar

**Su Voto Cuenta**:
- Las decisiones afectan directamente su calidad de vida en el condominio
- Muchas decisiones requieren quórum mínimo
- Su participación es fundamental para la democracia del condominio

**Temas Comunes de Votación**:
- Cambios en gastos comunes
- Mejoras en áreas comunes
- Modificaciones de reglamento
- Contratación de servicios
- Proyectos de inversión

#### Consejos

- **Vote con tiempo**: No espere hasta el último día
- **Lea toda la información**: Asegúrese de entender el tema
- **Consulte dudas**: Contacte a la administración si tiene preguntas
- **Participe activamente**: Su opinión es importante
- **Asista a las juntas**: Para entender mejor los temas a votar

---

### Ayuda

El botón de ayuda está disponible en el menú lateral del portal de residentes.

#### Solicitar Asistencia

1. **Acceda al Formulario de Ayuda**:
   - Haga clic en el botón "Ayuda" en el menú lateral
   - Se abrirá un modal con el formulario de soporte

2. **Complete su Solicitud**:
   - **Asunto**: Resumen breve de su consulta o problema
   - **Categoría**: Seleccione el tipo:
     - Problema técnico (con la plataforma)
     - Consulta sobre gastos comunes
     - Pregunta sobre reservas
     - Consulta general
     - Otro
   
   - **Descripción**: Explique detalladamente:
     - ¿Qué necesita?
     - ¿Qué problema está experimentando?
     - ¿Ha intentado algo previamente?
     - Cualquier información relevante

3. **Enviar Solicitud**:
   - Haga clic en **"Enviar Solicitud"**
   - Recibirá un número de ticket de soporte
   - Se enviará copia a su correo electrónico

#### Seguimiento de Solicitudes

**Ver Estado de sus Solicitudes**:
- Historial de todas las solicitudes de ayuda
- Para cada una verá:
  - Número de ticket
  - Asunto
  - Estado (Abierta, En proceso, Resuelta)
  - Fecha de creación
  - Última actualización

**Comunicación con Soporte**:
- Puede agregar comentarios a sus tickets abiertos
- Recibirá notificaciones cuando el soporte responda
- Toda la comunicación queda registrada en el ticket

#### Tiempo de Respuesta

- **Consultas generales**: 24-48 horas hábiles
- **Problemas técnicos**: Prioridad según severidad
- **Emergencias**: Contacte directamente a la administración

---

## Preguntas Frecuentes

### Generales

**¿Cómo cambio mi contraseña?**
- No hay una función de cambio de contraseña en el sistema actual
- Contacte al administrador para solicitar un restablecimiento de contraseña

**¿Cómo actualizo mi información de contacto?**
- Contacte al administrador del condominio
- Solo el administrador puede modificar datos de residentes

**¿Puedo tener múltiples usuarios en mi unidad?**
- Actualmente cada unidad tiene un usuario principal
- Consulte con el administrador sobre opciones para usuarios adicionales

### Pagos

**¿Qué métodos de pago están disponibles?**
- Depende de la configuración del condominio
- Típicamente: Transferencia bancaria, tarjetas de crédito/débito
- Consulte con su administración los métodos específicos

**¿Qué hago si no veo mis pagos?**
- Refresque la página (F5)
- Verifique que esté correctamente autenticado
- Si persiste, contacte al administrador

**¿Cómo obtengo un certificado de deuda/estar al día?**
- Contacte al administrador del condominio
- Típicamente se genera desde el módulo de administración

### Reservas

**¿Con cuánta anticipación debo reservar?**
- Generalmente 24-48 horas mínimo
- Cada condominio puede tener políticas diferentes
- Revise las reglas específicas de cada espacio

**¿Puedo cancelar una reserva?**
- Sí, puede cancelar desde el módulo de reservas
- Revise la política de cancelación de su condominio
- Algunas requieren anticipación mínima

**¿Qué hago si el espacio aparece ocupado pero sé que está libre?**
- Puede haber una reserva vigente
- Si cree que hay un error, contacte al administrador

### Códigos QR

**¿Cuántos QR puedo generar?**
- Generalmente no hay límite
- Use responsablemente
- Cancele QR no utilizados

**¿El visitante debe imprimir el QR?**
- No necesariamente
- Puede mostrarlo desde su teléfono
- Imprimir es opcional pero recomendado

**¿Qué pasa si el QR no funciona?**
- Verifique que esté dentro del horario válido
- Asegúrese de que no esté cancelado
- El guardia puede verificar manualmente con su nombre

### Incidencias

**¿Cuánto tardan en resolver una incidencia?**
- Depende de la complejidad del problema
- Incidencias simples: 1-3 días
- Problemas complejos: pueden tomar más tiempo
- El administrador le mantendrá informado

**¿Puedo reportar problemas en áreas comunes?**
- Sí, use el mismo sistema
- Especifique claramente la ubicación
- Agregue fotografías si es posible

### Soporte Técnico

**La plataforma no carga, ¿qué hago?**
1. Verifique su conexión a Internet
2. Intente con otro navegador
3. Limpie caché y cookies
4. Si persiste, contacte al administrador

**No recibo correos del sistema**
1. Revise su carpeta de spam
2. Verifique que su email esté correcto en el sistema
3. Agregue el email del condominio a contactos confiables

**¿Hay una aplicación móvil?**
- La plataforma es responsive y funciona en navegadores móviles
- Consulte con su administración sobre aplicaciones nativas

---

## Contacto y Soporte

Para soporte adicional, preguntas o problemas:

- **Email de Administración**: [Configurado por su condominio]
- **Teléfono de Oficina**: [Configurado por su condominio]
- **Horario de Atención**: [Configurado por su condominio]
- **Emergencias**: [Configurado por su condominio]

---

**Versión del Manual**: 1.0  
**Fecha de Creación**: Diciembre 2025  
**Última Actualización**: 01/12/2025  

Este manual está sujeto a actualizaciones según evolucione la plataforma CondoPlus.
