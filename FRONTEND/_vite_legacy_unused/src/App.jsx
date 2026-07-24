import React from "react";
import "./style.css"; // ajusta la ruta a donde tengas tu css/style.css

function InfinityPark() {
  return (
    <>
      <header>
        <div className="logo">
          <h1>Infinity <span>Park</span></h1>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#como-funciona">¿Cómo funciona?</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="acciones">
          <select id="idioma">
            <option>Español</option>
            <option>English</option>
            <option>Nederlands</option>
            <option>Deutsch</option>
          </select>

          <a href="/login">Iniciar sesión</a>
          <a href="/registro">Registrarse</a>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-texto">
            <h2>Empieza tu viaje con tranquilidad</h2>

            <p>
              Reserva tu plaza de aparcamiento de forma rápida,
              segura y sin complicaciones.
            </p>

            <ul className="hero-beneficios">
              <li>✔ Parking seguro 24/7</li>
              <li>✔ Reserva en menos de 2 minutos</li>
              <li>✔ Servicios Premium disponibles</li>
            </ul>
          </div>

          <div className="hero-contenido">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="entrada">Fecha de entrada</label>
                <input type="date" id="entrada" />
              </div>

              <div>
                <label htmlFor="salida">Fecha de salida</label>
                <input type="date" id="salida" />
              </div>

              <div>
                <label htmlFor="aeropuerto">Aeropuerto</label>
                <select id="aeropuerto">
                  <option>Seleccione un aeropuerto</option>
                  <option>Schiphol - Amsterdam</option>
                  <option>Barajas - Madrid</option>
                  <option>Charles de Gaulle - París</option>
                </select>
              </div>

              <div>
                <label htmlFor="parking">Tipo de parking</label>
                <select id="parking">
                  <option>Seleccione un tipo</option>
                  <option>Parking estándar</option>
                  <option>Parking cubierto</option>
                  <option>Parking Premium</option>
                </select>
              </div>

              <button type="submit">Comprobar disponibilidad</button>
            </form>
          </div>
        </section>

        <section id="servicios" className="servicios">
          <h2>Nuestros servicios</h2>
          <p className="subtitulo">Todo lo que tu vehículo necesita mientras disfrutas de tu viaje.</p>

          <div className="contenedor-servicios">
            <article className="tarjeta-servicio">
              <div className="icono">🚗</div>
              <h3>Parking seguro</h3>
              <p>Tu vehículo permanecerá protegido durante toda tu ausencia.</p>
            </article>

            <article className="tarjeta-servicio">
              <div className="icono">🧼</div>
              <h3>Lavado</h3>
              <p>Limpieza interior y exterior antes de tu regreso.</p>
            </article>

            <article className="tarjeta-servicio">
              <div className="icono">🔑</div>
              <h3>Valet Parking</h3>
              <p>Recogida y entrega del vehículo cerca de la terminal.</p>
            </article>

            <article className="tarjeta-servicio">
              <div className="icono">⭐</div>
              <h3>Servicios Premium</h3>
              <p>Personaliza tu reserva con servicios adicionales.</p>
            </article>
          </div>
        </section>

        <section className="servicios">
          <h2>¿Por qué elegir Infinity Park?</h2>

          <div className="contenedor-servicios">
            <div className="tarjeta">
              <h3>Seguridad</h3>
              <p>Vigilancia permanente.</p>
            </div>

            <div className="tarjeta">
              <h3>Rapidez</h3>
              <p>Reserva en pocos minutos.</p>
            </div>

            <div className="tarjeta">
              <h3>Servicios Premium</h3>
              <p>Más opciones para cuidar tu vehículo.</p>
            </div>

            <div className="tarjeta">
              <h3>Atención personalizada</h3>
              <p>Te acompañamos antes, durante y después de tu reserva.</p>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="como-funciona">
          <h2>¿Cómo funciona?</h2>
          <p className="subtitulo">Reserva tu plaza en cuatro pasos.</p>

          <div className="contenedor-pasos">
            <div className="paso">
              <div className="numero">1</div>
              <h3>Reserva</h3>
              <p>Selecciona fechas y aeropuerto.</p>
            </div>

            <div className="paso">
              <div className="numero">2</div>
              <h3>Entrega</h3>
              <p>Recibimos tu vehículo.</p>
            </div>

            <div className="paso">
              <div className="numero">3</div>
              <h3>Viaja</h3>
              <p>Nosotros lo cuidamos.</p>
            </div>

            <div className="paso">
              <div className="numero">4</div>
              <h3>Recoge</h3>
              <p>Todo listo a tu regreso.</p>
            </div>
          </div>
        </section>

        <footer id="contacto">
          <div className="footer-contenido">
            <div className="footer-columna">
              <h3>Infinity <span>Park</span></h3>
              <p>Tu vehículo seguro mientras disfrutas del viaje.</p>
            </div>

            <div className="footer-columna">
              <h4>Síguenos</h4>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>

            <div className="footer-columna">
              <h4>Servicios</h4>
              <a href="#">Parking</a>
              <a href="#">Lavado</a>
              <a href="#">Valet Parking</a>
              <a href="#">Premium</a>
            </div>

            <div className="footer-columna">
              <h4>Empresa</h4>
              <a href="#">Sobre nosotros</a>
              <a href="#">Contacto</a>
              <a href="#">Preguntas frecuentes</a>
            </div>

            <div className="footer-columna">
              <h4>Ayuda</h4>
              <a href="#">Mi reserva</a>
              <a href="#">Soporte</a>
              <a href="#">Cancelar reserva</a>
            </div>

            <div className="footer-columna">
              <h4>Legal</h4>
              <a href="#">Privacidad</a>
              <a href="#">Cookies</a>
              <a href="#">Términos</a>
            </div>
          </div>

          <div className="footer-inferior">
            <p>© 2026 Infinity Park. Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default InfinityPark;