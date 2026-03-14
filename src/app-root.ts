import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { content } from "./content";

@customElement("app-root")
export class AppRoot extends LitElement {
  @state() private expanded = false;

  static styles = css`
    :host {
      display: block;
      color: #eef2ff;
    }

    .page {
      max-width: 980px;
      margin: 0 auto;
      padding: 2.5rem 1.2rem 4rem;
    }

    .hero {
      background: linear-gradient(145deg, rgba(14, 20, 38, 0.95), rgba(10, 38, 84, 0.85));
      border: 1px solid rgba(102, 153, 255, 0.24);
      border-radius: 24px;
      padding: 1.8rem;
      box-shadow: 0 30px 80px rgba(3, 10, 28, 0.45);
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 5vw, 3.2rem);
      line-height: 1.1;
    }

    .subtitle {
      margin-top: 0.7rem;
      color: #bfd4ff;
      font-size: 1.05rem;
    }

    .problem {
      margin-top: 1rem;
      color: #dbe7ff;
      line-height: 1.7;
    }

    .grid {
      margin-top: 1.1rem;
      display: grid;
      gap: 0.9rem;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .card {
      border: 1px solid rgba(121, 164, 255, 0.2);
      border-radius: 14px;
      background: rgba(8, 18, 38, 0.72);
      padding: 0.95rem;
      color: #d6e5ff;
      font-size: 0.95rem;
      line-height: 1.55;
    }

    button {
      margin-top: 1.1rem;
      border: 0;
      border-radius: 999px;
      padding: 0.65rem 1rem;
      font-weight: 700;
      color: #02273f;
      background: linear-gradient(135deg, #6ff7da, #6fc9ff);
      cursor: pointer;
    }

    .extra {
      margin-top: 0.8rem;
      color: #d0e1ff;
      font-size: 0.92rem;
      line-height: 1.6;
    }
  `;

  render() {
    return html`
      <main class="page">
        <section class="hero">
          <h1>${content.title}</h1>
          <p class="subtitle">${content.subtitle}</p>
          <p class="problem"><strong>Problem:</strong> ${content.problem}</p>

          <div class="grid">
            ${content.features.map((feature) => html`<article class="card">${feature}</article>`) }
          </div>

          <button @click=${this.toggleDetails}>
            ${this.expanded ? "Hide" : "Show"} product context
          </button>

          ${this.expanded
            ? html`<p class="extra"><strong>Target users:</strong> ${content.audience}. This project page runs as a lightweight Lit + Vite static app.</p>`
            : null}
        </section>
      </main>
    `;
  }

  private toggleDetails() {
    this.expanded = !this.expanded;
  }
}
