import "./styles/Profile.css"

function Profile() {
  return (
    <section className="profile-center">
      <div className="profile-card">
        <h1>Agnessa Tund</h1>

        <h3>Hobid</h3>
        <ul>
          <li>Lugemine</li>
          <li>Ristsõnade lahendamine</li>
          <li>Sport</li>
        </ul>

        <h3>Võta ühendust</h3>
        <form onSubmit={e => e.preventDefault()}>
          <label>
            E-mail:
            <input
              type="email"
              placeholder="email..."
              required
            />
          </label>
          <label>
            Tekst:
            <textarea
              placeholder="tekst..."
              rows={4}
            />
          </label>
          <button type="button">Saada päring</button>
        </form>
      </div>
    </section>
  )
}

export default Profile
