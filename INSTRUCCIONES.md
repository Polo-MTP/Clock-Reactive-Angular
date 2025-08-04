# Reloj Reactivo Angular

Una aplicación de reloj interactiva construida con Angular que permite personalizar la hora inicial y modificar la apariencia del reloj en tiempo real.

## Características

### 🕐 Formulario de Inicialización
- Permite establecer la hora inicial del reloj (horas, minutos, segundos)
- Validación de campos para asegurar valores correctos
- Interface intuitiva y fácil de usar

### 🎨 Editor de Colores
- **Manecillas**: Cambia el color de las manecillas del reloj
- **Números**: Personaliza el color de los números del reloj
- **Fondo del Reloj**: Modifica el color de fondo del círculo del reloj
- **Rayitas/Marcas**: Ajusta el color de las marcas de minutos y horas
- **Fondo Hora Digital**: Cambia el color de fondo del display digital

### ⏰ Control de Tiempo en Tiempo Real
- **Botones de ajuste rápido**:
  - ±1 segundo, ±1 minuto, ±1 hora
  - ±10 segundos, ±10 minutos para ajustes más rápidos
- **Display digital**: Muestra la hora exacta que se actualiza automáticamente
- **Sincronización**: Los cambios se reflejan instantáneamente en el reloj

### 🔄 Funcionalidades Reactivas
- El reloj avanza automáticamente cada segundo
- Los cambios de color se aplican inmediatamente
- Todas las modificaciones de tiempo se reflejan en tiempo real
- Modelo de datos reactivo usando Angular Signals

## Cómo Usar

### 1. Crear un Reloj
1. Al abrir la aplicación, verás un formulario con tres campos
2. Ingresa la hora inicial deseada (horas: 0-23, minutos/segundos: 0-59)
3. Haz clic en "Crear Reloj"

### 2. Personalizar Colores
1. Una vez creado el reloj, haz clic en "✏️ Editar Colores"
2. Se abrirá un modal con selectores de color
3. Modifica los colores según tu preferencia
4. Haz clic en "Guardar" para aplicar los cambios

### 3. Controlar el Tiempo
1. Haz clic en "👁️ Controlar Tiempo"
2. Usa los botones para adelantar o atrasar el tiempo:
   - Botones azules: Ajustes básicos (±1s, ±1m, ±1h)
   - Botones rojos: Ajustes rápidos (±10s, ±10m)
3. Observa cómo los cambios se reflejan inmediatamente en el reloj

## Arquitectura Técnica

### Modelo de Datos
- **ClockModel**: Clase que representa el estado del reloj con métodos para ajustar el tiempo
- **ClockService**: Servicio que maneja el estado global del reloj usando Angular Signals
- **ClockColors**: Interface que define los colores personalizables

### Componentes
- **ClockFormComponent**: Formulario de inicialización
- **ClockComponent**: Visualización del reloj analógico y digital
- **ClockControlsComponent**: Controles de edición y ajuste de tiempo
- **App**: Componente principal que orquesta la aplicación

### Características Técnicas
- **Reactive Programming**: Uso de Angular Signals para reactividad
- **Real-time Updates**: Actualización automática cada segundo
- **SVG Graphics**: Reloj analógico renderizado con SVG
- **Responsive Design**: Interface adaptable a diferentes tamaños de pantalla

## Ejecutar la Aplicación

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## Estructura del Proyecto

```
src/app/
├── clock.model.ts          # Modelo de datos del reloj
├── clock.service.ts        # Servicio de gestión de estado
├── clock.component.ts      # Componente de visualización del reloj
├── clock-form.component.ts # Formulario de inicialización
├── clock-controls.component.ts # Controles de edición
├── app.ts                  # Componente principal
├── app.html               # Template principal
└── app.css                # Estilos globales
```

¡Disfruta personalizando tu reloj reactivo! ⏰✨
