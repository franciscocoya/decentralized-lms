"use client";

import { Button } from "@/components/ui/button";

export default function NotFound() {

  const style = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  }

  return (
    <html lang="es">
      <body>
        <div style={style as any}>
          <h1>Página no encontrada</h1>
          <span>La página que buscas no está disponible</span>
          <Button>Volver a inicio</Button>
        </div>
      </body>
    </html>
  );
}
