from db import get_connection

def get_active_boats():
    with get_connection() as conn:
        active_boats = conn.execute("select * from brod where aktivan = true").fetchall()
    return active_boats

#osnovni podaci o brodu + oprema + dodatne usluge (s cijenom) + podaci o luci + fotografije
def get_boat_info(id_boat): 
    with get_connection() as conn:
            basics = conn.execute("select * from brod where id_brod = %s", (id_boat,)).fetchone()
            if basics is None:
                return None
            equipment = conn.execute(
                """
                select oprema.id_opreme, oprema.naziv
                from model_oprema join
                                oprema on model_oprema.id_opreme = oprema.id_opreme
                where model_oprema.id_model = %s
                order by oprema.naziv
                """
                 , (basics["id_model"],)).fetchall()
            model_info = conn.execute("select * from model where id_model = %s", (basics["id_model"],)).fetchone()
            services = conn.execute(
                """
                select dodatne_usluge.id_dodatne_usluge, dodatne_usluge.naziv, model_usluge.cijena
                from model_usluge
                join dodatne_usluge on model_usluge.id_dodatne_usluge = dodatne_usluge.id_dodatne_usluge
                where model_usluge.id_model = %s
                order by dodatne_usluge.naziv
                """
                 , (basics["id_model"],)).fetchall()
            port_info = conn.execute("select * from luka where id_luka = %s",(basics["id_luka"],)).fetchone()
            photos = conn.execute("select * from fotografija where id_brod = %s order by redoslijed",(id_boat,)).fetchall()

            boat_info = {}
            boat_info["basics"] = basics
            boat_info["model"] = model_info
            boat_info["port"] = port_info
            boat_info["equipment"] = equipment
            boat_info["services"] = services
            boat_info["photos"] = photos

            return boat_info

def get_boat_busy_dates(id_boat, date_from, date_to):
    params = {"id": id_boat, "od": date_from, "do": date_to}
    with get_connection() as conn:
        return conn.execute("""
            select datum_preuzimanja as od, datum_povratka as do, 'rezervacija' as izvor
            from rezervacija
            where id_brod = %(id)s
              and datum_preuzimanja <= %(do)s
              and datum_povratka >= %(od)s
              and (status = 'potvrdena'
                   or (status = 'u tijeku' and vrijeme_nastanak > now() - interval '10 minutes'))

            union all

            select datum_pocetak, datum_kraj, 'nedostupnost'
            from nedostupnost
            where id_brod = %(id)s
              and datum_pocetak <= %(do)s
              and datum_kraj >= %(od)s

            order by od
        """, params).fetchall()


def search_boats(date_from=None, date_to=None, num_of_people=None, port=None, category=None, equipment=None, price_per_day=None, num_of_cabins=None, services=None):
    pass

def get_categories():
    return ["jedrilica", "motorni brod", "katamaran", "ostalo"]

def get_equipment():
    with get_connection() as conn:
        return conn.execute("select id_opreme, naziv from oprema order by naziv").fetchall()

def get_services():
    with get_connection() as conn:
        return conn.execute("select id_dodatne_usluge, naziv from dodatne_usluge order by naziv").fetchall()

def get_ports():
    with get_connection() as conn:
        return conn.execute("select id_luka, ime_luka, lat, lng from luka order by ime_luka").fetchall()
