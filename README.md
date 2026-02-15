# Patrón Bridge - Sistema de Notificaciones (TypeScript)

## Tipo de Patrón
**ESTRUCTURAL - BRIDGE (PUENTE)**

## Mejores Prácticas Aplicadas

- ✅ **Separación de responsabilidades** - Cada archivo una responsabilidad
- ✅ **Principio SOLID** - SRP, OCP, DIP
- ✅ **Barrel Exports** - Exports organizados con index.ts
- ✅ **Estructura modular** - Código en carpetas lógicas
- ✅ **Type Safety** - TypeScript estricto
- ✅ **Clean Code** - Nombres descriptivos, funciones pequeñas

## 📐 Estructura del Proyecto

```
src/
├── types/              # Tipos centralizados
├── interfaces/         # Contratos del sistema
├── plataformas/        # Implementadores (CÓMO)
├── notificaciones/     # Abstracciones (QUÉ)
├── index.ts            # Punto de entrada
└── demo.ts             # Demostración
```

##  Ejecución

```bash
npm start

# Modo desarrollo
npm run dev
```
