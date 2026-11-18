// PRIVREMENO: zamijeniti rješenjem iz zadatka 4 (prijava, frontend).
// Ostatak koda treba samo: prijavljen (true/false) i prijava(povratnaPutanja).
export function useKorisnik() {
  return {
    prijavljen: false,
    prijava: () => window.alert('Prijava još nije povezana (radi se u zadatku prijave).'),
  };
}
