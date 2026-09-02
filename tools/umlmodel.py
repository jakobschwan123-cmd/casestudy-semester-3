# -*- coding: utf-8 -*-
"""
Single source of truth for the RepairFlow OO model (class model + use-case model).
Generates PlantUML (for rendering / reading) and XMI 2.1 (for import into Visual Paradigm).
"""
from xml.sax.saxutils import escape, quoteattr

# ----------------------------------------------------------------------------- enums
ENUMS = {
    "AuftragStatus": ["ANGENOMMEN", "IN_DIAGNOSE", "KVA_OFFEN", "FREIGEGEBEN", "ABGELEHNT", "TEILE_BESTELLT",
                      "IN_REPARATUR", "FERTIG", "ABGEHOLT"],
    "KvaStatus": ["VORLAEUFIG", "ENTWURF", "VERSENDET", "FREIGEGEBEN", "ABGELEHNT"],
    "ReservierungStatus": ["VORRESERVIERT", "RESERVIERT", "ENTNOMMEN", "STORNIERT"],
    "BestellStatus": ["VORSCHLAG", "OFFEN", "BESTAETIGT", "WARENEINGANG", "STORNIERT"],
    "ZahlungStatus": ["OFFEN", "BEZAHLT", "MAHNUNG"],
    "GeraeteTyp": ["FAHRRAD", "EBIKE", "ELEKTRONIK"],
    "MedienTyp": ["FOTO", "VIDEO", "AUDIO"],
}

# ----------------------------------------------------------------------------- classes
# (name, abstract, stereotype, [attributes], [operations])   attribute: (vis, name, type)   operation: (vis, name, params, return)
CLASSES = [
    ("Person", True, None,
     [("#", "name", "String"), ("#", "telefon", "String"), ("#", "email", "String")],
     [("+", "getKontakt", "", "String")]),
    ("Kunde", False, None,
     [("-", "kundennummer", "String"), ("-", "adresse", "String"), ("-", "benachrichtigungskanal", "String")],
     [("+", "fordereSofortdiagnoseAn", "medien : List<Medienanhang>", "Voranmeldung"),
      ("+", "legeAuftragAn", "g : Geraet", "Reparaturauftrag"),
      ("+", "gibKvaFrei", "kva : Kostenvoranschlag", "void"),
      ("+", "lehneKvaAb", "kva : Kostenvoranschlag", "void"),
      ("+", "meldeMangel", "a : Reparaturauftrag, beschreibung : String", "Reklamation")]),
    ("Mitarbeiter", True, None,
     [("#", "personalnummer", "String"), ("#", "rolle", "String")],
     [("+", "getRolle", "", "String")]),
    ("Techniker", False, None,
     [("-", "qualifikation", "String")],
     [("+", "pruefeDiagnosevorschlag", "v : KIDiagnosevorschlag", "boolean"),
      ("+", "erfasseBefund", "a : Reparaturauftrag", "Fehlerbefund"),
      ("+", "bucheArbeitszeit", "s : Reparaturschritt, dauer : int", "Arbeitszeitbuchung")]),
    ("Disponent", False, None,
     [],
     [("+", "pruefeVerfuegbarkeit", "e : Ersatzteil, menge : int", "boolean"),
      ("+", "reserviereTeil", "e : Ersatzteil, menge : int", "ErsatzteilReservierung"),
      ("+", "loeseBestellungAus", "l : Lieferant", "Lieferantenbestellung"),
      ("+", "bucheWareneingang", "b : Lieferantenbestellung", "void")]),
    ("Werkstattleiter", False, None,
     [],
     [("+", "weiseTechnikerZu", "a : Reparaturauftrag, t : Techniker", "void"),
      ("+", "pruefeAuslastung", "f : Filiale, datum : Date", "double"),
      ("+", "gibBestellungFrei", "b : Lieferantenbestellung", "void"),
      ("+", "entscheideReklamation", "r : Reklamation", "void")]),
    ("Werkstattbetrieb", False, "mandant",
     [("-", "betriebsnummer", "String"), ("-", "firmenname", "String"), ("-", "tarif", "String"), ("-", "aktivSeit", "Date")],
     [("+", "legeFilialeAn", "name : String, adresse : String", "Filiale"),
      ("+", "getFilialen", "", "List<Filiale>")]),
    ("Filiale", False, "stammdaten",
     [("-", "filialnummer", "String"), ("-", "name", "String"), ("-", "adresse", "String")],
     [("+", "getAuslastung", "von : Date, bis : Date", "double"),
      ("+", "getFreieTermine", "ab : Date", "List<Date>")]),
    ("Lieferant", False, "stammdaten",
     [("-", "lieferantennummer", "String"), ("-", "name", "String"), ("-", "lieferzeitTage", "int")],
     [("+", "erstelleBestellung", "pos : List<Bestellposition>", "Lieferantenbestellung")]),
    ("Voranmeldung", False, None,
     [("-", "voranmeldungsnummer", "String"), ("-", "erstelltAm", "Date"), ("-", "gueltigBis", "Date"),
      ("-", "symptombeschreibung", "String"), ("-", "wunschtermin", "Date"), ("-", "bestaetigt", "boolean")],
     [("+", "erstellen", "medien : List<Medienanhang>, symptome : String", "void"),
      ("+", "bestaetigen", "", "void"), ("+", "verwerfen", "", "void"),
      ("+", "bessereAufnahmeAnfordern", "", "void"),
      ("+", "inAuftragUebernehmen", "", "Reparaturauftrag")]),
    ("Medienanhang", False, None,
     [("-", "dateiname", "String"), ("-", "typ", "MedienTyp"), ("-", "aufnahmedatum", "Date"), ("-", "auswertbar", "boolean")],
     [("+", "analysieren", "", "KIDiagnosevorschlag")]),
    ("KIDiagnosevorschlag", False, None,
     [("-", "vorschlagsnummer", "String"), ("-", "wahrscheinlicheUrsache", "String"), ("-", "konfidenz", "double"),
      ("-", "geschaetzterAufwandMin", "int"), ("-", "bestaetigt", "boolean")],
     [("+", "erzeugeVorabKva", "", "Kostenvoranschlag"), ("+", "getBenoetigteTeile", "", "List<Ersatzteil>"),
      ("+", "bestaetigen", "t : Techniker", "void")]),
    ("Reparaturauftrag", False, None,
     [("-", "auftragsnummer", "String"), ("-", "eingangsdatum", "Date"), ("-", "status", "AuftragStatus"),
      ("-", "werkstatttermin", "Date")],
     [("+", "wechsleStatus", "neu : AuftragStatus", "void"), ("+", "alleSchritteAbgeschlossen", "", "boolean"),
      ("+", "fertigmelden", "", "void"), ("+", "benachrichtigeKunde", "text : String", "void")]),
    ("Geraet", False, None,
     [("-", "seriennummer", "String"), ("-", "hersteller", "String"), ("-", "modell", "String"), ("-", "typ", "GeraeteTyp")],
     []),
    ("Fehlerbefund", False, None,
     [("-", "befundnummer", "String"), ("-", "datum", "Date"), ("-", "beschreibung", "String"), ("-", "schweregrad", "int")],
     [("+", "istReparaturLohnend", "", "boolean")]),
    ("Kostenvoranschlag", False, None,
     [("-", "kvaNummer", "String"), ("-", "erstelldatum", "Date"), ("-", "gueltigBis", "Date"),
      ("-", "status", "KvaStatus"), ("-", "vorlaeufig", "boolean")],
     [("+", "addPosition", "p : KvaPosition", "void"), ("+", "getPositionen", "", "List<KvaPosition>"),
      ("+", "berechneSumme", "", "double"), ("+", "versendeAnKunde", "", "void"),
      ("+", "freigeben", "", "void"), ("+", "ablehnen", "grund : String", "void"),
      ("+", "setzeStatus", "s : KvaStatus", "void")]),
    ("KvaPosition", False, None,
     [("-", "bezeichnung", "String"), ("-", "menge", "int"), ("-", "einzelpreis", "double")],
     [("+", "zwischensumme", "", "double")]),
    ("Reparaturschritt", False, None,
     [("-", "schrittnummer", "int"), ("-", "beschreibung", "String"), ("-", "abgeschlossen", "boolean")],
     [("+", "schliesseAb", "", "void")]),
    ("Arbeitszeitbuchung", False, None,
     [("-", "datum", "Date"), ("-", "dauerMinuten", "int"), ("-", "stundensatz", "double")],
     [("+", "berechneKosten", "", "double")]),
    ("Ersatzteil", False, "stammdaten",
     [("-", "artikelnummer", "String"), ("-", "bezeichnung", "String"), ("-", "einkaufspreis", "double"),
      ("-", "verkaufspreis", "double")],
     [("+", "getVorzugslieferant", "", "Lieferant")]),
    ("Lagerbestand", False, None,
     [("-", "menge", "int"), ("-", "reserviert", "int"), ("-", "meldebestand", "int")],
     [("+", "pruefeVerfuegbarkeit", "anzahl : int", "boolean"), ("+", "bucheZugang", "anzahl : int", "void"),
      ("+", "bucheAbgang", "anzahl : int", "void"), ("+", "istMeldebestandUnterschritten", "", "boolean")]),
    ("ErsatzteilReservierung", False, None,
     [("-", "reservierungsnummer", "String"), ("-", "menge", "int"), ("-", "datum", "Date"),
      ("-", "status", "ReservierungStatus")],
     [("+", "reserviere", "", "void"), ("+", "storniere", "", "void"), ("+", "entnehmen", "", "void")]),
    ("Lieferantenbestellung", False, None,
     [("-", "bestellnummer", "String"), ("-", "bestelldatum", "Date"), ("-", "liefertermin", "Date"),
      ("-", "status", "BestellStatus")],
     [("+", "addPosition", "teil : Ersatzteil, menge : int", "void"), ("+", "uebermittle", "", "void"),
      ("+", "bucheWareneingang", "", "void"), ("+", "berechneBestellwert", "", "double")]),
    ("Bestellposition", False, None,
     [("-", "menge", "int"), ("-", "einzelpreis", "double")],
     [("+", "positionswert", "", "double")]),
    ("Rechnung", False, None,
     [("-", "rechnungsnummer", "String"), ("-", "rechnungsdatum", "Date"), ("-", "bruttobetrag", "double"),
      ("-", "zahlungStatus", "ZahlungStatus")],
     [("+", "berechneBetrag", "", "double"), ("+", "erfasseZahlung", "art : String", "void")]),
    ("Reklamation", False, None,
     [("-", "reklamationsnummer", "String"), ("-", "datum", "Date"), ("-", "grund", "String"),
      ("-", "istGewaehrleistung", "boolean")],
     [("+", "pruefeGewaehrleistung", "", "boolean"), ("+", "schliesseAb", "", "void")]),
]

GENERALIZATIONS = [("Kunde", "Person"), ("Mitarbeiter", "Person"),
                   ("Techniker", "Mitarbeiter"), ("Disponent", "Mitarbeiter"), ("Werkstattleiter", "Mitarbeiter")]

# (whole/left, mult_left, kind, right, mult_right, name)   kind: assoc | comp | agg | dep
ASSOCIATIONS = [
    ("Werkstattbetrieb", "1", "comp", "Filiale", "1..*", "betreibt"),
    ("Werkstattbetrieb", "1", "assoc", "Mitarbeiter", "1..*", "beschäftigt"),
    ("Mitarbeiter", "1..*", "assoc", "Filiale", "1", "arbeitet in"),
    ("Kunde", "1", "assoc", "Voranmeldung", "0..*", "stellt"),
    ("Kunde", "1", "assoc", "Reparaturauftrag", "0..*", "beauftragt"),
    ("Voranmeldung", "1", "comp", "Medienanhang", "1..*", "enthält"),
    ("Voranmeldung", "1", "comp", "KIDiagnosevorschlag", "0..1", "führt zu"),
    ("Voranmeldung", "0..*", "assoc", "Filiale", "1", "Wunschfiliale"),
    ("Voranmeldung", "0..1", "assoc", "Reparaturauftrag", "0..1", "wird übernommen in"),
    ("KIDiagnosevorschlag", "1", "assoc", "Kostenvoranschlag", "0..1", "erzeugt vorläufigen"),
    ("KIDiagnosevorschlag", "0..*", "assoc", "Ersatzteil", "0..*", "schlägt vor"),
    ("Fehlerbefund", "0..1", "assoc", "KIDiagnosevorschlag", "0..1", "prüft"),
    ("Reparaturauftrag", "1", "comp", "Geraet", "1", "betrifft"),
    ("Reparaturauftrag", "0..*", "assoc", "Filiale", "1", "bearbeitet in"),
    ("Reparaturauftrag", "0..*", "assoc", "Techniker", "0..1", "zugewiesen an"),
    ("Reparaturauftrag", "1", "comp", "Fehlerbefund", "0..1", "hat"),
    ("Fehlerbefund", "0..*", "assoc", "Techniker", "1", "erstellt von"),
    ("Reparaturauftrag", "1", "comp", "Kostenvoranschlag", "0..*", "hat"),
    ("Kostenvoranschlag", "1", "comp", "KvaPosition", "1..*", "besteht aus"),
    ("KvaPosition", "0..*", "assoc", "Ersatzteil", "0..1", "referenziert"),
    ("Reparaturauftrag", "1", "comp", "Reparaturschritt", "0..*", "gliedert sich in"),
    ("Reparaturschritt", "1", "comp", "Arbeitszeitbuchung", "0..*", "erfasst"),
    ("Arbeitszeitbuchung", "0..*", "assoc", "Techniker", "1", "gebucht von"),
    ("Ersatzteil", "1", "assoc", "Lagerbestand", "0..*", "geführt als"),
    ("Lagerbestand", "0..*", "assoc", "Filiale", "1", "liegt in"),
    ("ErsatzteilReservierung", "0..*", "assoc", "Lagerbestand", "1", "reserviert auf"),
    ("ErsatzteilReservierung", "0..*", "assoc", "Reparaturauftrag", "0..1", "für"),
    ("ErsatzteilReservierung", "0..*", "assoc", "Voranmeldung", "0..1", "vorreserviert für"),
    ("Lieferant", "1", "assoc", "Lieferantenbestellung", "0..*", "erhält"),
    ("Lieferantenbestellung", "1", "comp", "Bestellposition", "1..*", "besteht aus"),
    ("Bestellposition", "0..*", "assoc", "Ersatzteil", "1", "betrifft"),
    ("Lieferantenbestellung", "0..*", "assoc", "Filiale", "1", "bestellt von"),
    ("Reparaturauftrag", "1", "assoc", "Rechnung", "0..1", "abgerechnet mit"),
    ("Reparaturauftrag", "1", "assoc", "Reklamation", "0..*", "reklamiert als"),
]

# ----------------------------------------------------------------------------- use cases
ACTORS = [  # (id, name, kind: primary/secondary, description)
    ("Kunde", "Kunde", "primär, extern", "Nutzt die RepairFlow-App: Sofortdiagnose, Voranmeldung, KVA-Freigabe, Zahlung, Reklamation"),
    ("Techniker", "Techniker", "primär, intern", "Diagnose, KVA-Inhalt, Reparaturschritte, Fertigmeldung"),
    ("Disponent", "Disponent", "primär, intern", "Ersatzteil-Disposition über alle Filialen, Bestellung, Wareneingang"),
    ("Werkstattleiter", "Werkstattleiter", "primär, intern", "Terminplanung, Technikerzuweisung, Rechnungsfreigabe, Reklamationen"),
    ("Werkstattinhaber", "Werkstattinhaber", "primär, intern", "Onboarding des Werkstattbetriebs, Filialen und Nutzer in RepairFlow"),
    ("Lieferant", "Lieferant", "sekundär, extern", "Empfängt Bestellungen, liefert Ersatzteile, bearbeitet Retouren"),
    ("KIDienst", "KI-Diagnosedienst", "sekundär, extern (System)", "Externer KI-Dienst, der Foto, Video und Ton auswertet"),
]

USECASES = [  # (id, name)
    ("UC01", "Sofortdiagnose anfordern"),
    ("UC02", "Voranmeldung bestätigen"),
    ("UC03", "Reparaturauftrag anlegen"),
    ("UC04", "Diagnosevorschlag prüfen"),
    ("UC05", "Diagnosebefund erfassen"),
    ("UC06", "KVA erstellen"),
    ("UC07", "KVA freigeben / ablehnen"),
    ("UC08", "Ersatzteil-Verfügbarkeit prüfen"),
    ("UC09", "Ersatzteil reservieren"),
    ("UC10", "Lieferantenbestellung auslösen"),
    ("UC11", "Wareneingang buchen"),
    ("UC12", "Nachbestellvorschlag bei Meldebestand"),
    ("UC13", "Reparaturschritt und Arbeitszeit erfassen"),
    ("UC14", "Auftrag fertigmelden und Kunde benachrichtigen"),
    ("UC15", "Rechnung erstellen und Zahlung erfassen"),
    ("UC16", "Reklamation bearbeiten"),
    ("UC17", "Werkstatttermin planen und Techniker zuweisen"),
    ("UC18", "Werkstattbetrieb und Filialen verwalten"),
]

ACTOR_UC = [
    ("Kunde", ["UC01", "UC02", "UC03", "UC07", "UC15", "UC16"]),
    ("Techniker", ["UC04", "UC05", "UC06", "UC13", "UC14"]),
    ("Disponent", ["UC08", "UC09", "UC10", "UC11", "UC12"]),
    ("Werkstattleiter", ["UC03", "UC15", "UC16", "UC17"]),
    ("Werkstattinhaber", ["UC18"]),
    ("Lieferant", ["UC10", "UC11"]),
    ("KIDienst", ["UC01"]),
]

INCLUDES = [  # (base, included)
    ("UC01", "UC08"), ("UC06", "UC05"), ("UC09", "UC08"), ("UC10", "UC09"), ("UC15", "UC14"),
]
EXTENDS = [  # (extension, extended)
    ("UC02", "UC01"), ("UC04", "UC05"), ("UC12", "UC08"), ("UC16", "UC15"),
]

# ----------------------------------------------------------------------------- PlantUML

PACKAGES = [
    ("Mandant und Organisation", ["Werkstattbetrieb", "Filiale", "Person", "Mitarbeiter", "Techniker", "Disponent", "Werkstattleiter"]),
    ("Kundenkontakt und KI-Sofortdiagnose", ["Kunde", "Voranmeldung", "Medienanhang", "KIDiagnosevorschlag"]),
    ("Auftragsabwicklung", ["Reparaturauftrag", "Geraet", "Fehlerbefund", "Kostenvoranschlag", "KvaPosition",
                            "Reparaturschritt", "Arbeitszeitbuchung", "Rechnung", "Reklamation"]),
    ("Ersatzteil-Disposition", ["Ersatzteil", "Lagerbestand", "ErsatzteilReservierung", "Lieferantenbestellung",
                                "Bestellposition", "Lieferant"]),
]


def class_body(name, abstract, stereo, attrs, ops, indent="  "):
    L = []
    head = "abstract class %s" % name if abstract else "class %s" % name
    if stereo:
        head += " <<%s>>" % stereo
    L.append(indent + head + " {")
    for vis, an, at in attrs:
        L.append(indent + "  %s %s : %s" % (vis, an, at))
    if attrs and ops:
        L.append(indent + "  --")
    for vis, on, params, ret in ops:
        L.append(indent + "  %s %s(%s) : %s" % (vis, on, params, ret))
    L.append(indent + "}")
    return L


HINTS = {("Werkstattbetrieb", "Filiale"), ("Kunde", "Voranmeldung"), ("Kunde", "Reparaturauftrag"),
         ("Voranmeldung", "Medienanhang"), ("Voranmeldung", "KIDiagnosevorschlag"), ("Reparaturauftrag", "Rechnung"),
         ("Reparaturauftrag", "Reklamation"), ("Reparaturauftrag", "Reparaturschritt"), ("Reparaturschritt", "Arbeitszeitbuchung"),
         ("Ersatzteil", "Lagerbestand"), ("Lieferant", "Lieferantenbestellung"), ("Lieferantenbestellung", "Bestellposition"),
         ("Kostenvoranschlag", "KvaPosition")}


def class_puml(subset=None, title="cd : RepairFlow – Klassendiagramm", enums=True):
    """Full class diagram (subset=None) or a focus diagram containing only the given classes."""
    names = [c[0] for c in CLASSES] if subset is None else list(subset)
    by = {c[0]: c for c in CLASSES}
    L = ["@startuml", "skinparam classAttributeIconSize 0", "skinparam defaultFontName Arial",
         "skinparam classFontSize 11", "skinparam nodesep 25", "skinparam ranksep 45", "hide circle",
         "title %s" % title, ""]
    for nme in names:
        L += class_body(*by[nme], indent="")
    if enums and subset is None:
        L.append('package "Aufzählungen" {')
        for e, lits in ENUMS.items():
            L.append("  enum %s {" % e)
            L += ["    " + x for x in lits]
            L.append("  }")
        L.append("}")
    for sub, sup in GENERALIZATIONS:
        if sub in names and sup in names:
            L.append("%s <|-- %s" % (sup, sub))
    for a, ma, kind, b, mb, name in ASSOCIATIONS:
        if a not in names or b not in names:
            continue
        h = (a, b) in HINTS
        if kind == "comp":
            arrow = "*-down-" if h else "*--"
        elif kind == "agg":
            arrow = "o-down-" if h else "o--"
        elif kind == "assoc":
            arrow = "-down-" if h else "--"
        else:
            arrow = "..>"
        L.append('%s "%s" %s "%s" %s : %s >' % (a, ma, arrow, mb, b, name))
    if subset is None:
        L.append("Werkstattbetrieb -[hidden]right- Kunde")
        L.append("Reklamation -[hidden]down- AuftragStatus")
    L.append("@enduml")
    return "\n".join(L) + "\n"


FOCUS = {
    "klassen-fokus-1-sofortdiagnose": ("cd : Fokus 1 – Kundenkontakt und KI-Sofortdiagnose",
        ["Kunde", "Voranmeldung", "Medienanhang", "KIDiagnosevorschlag", "Kostenvoranschlag", "ErsatzteilReservierung", "Filiale", "Reparaturauftrag", "Ersatzteil"]),
    "klassen-fokus-2-auftrag": ("cd : Fokus 2 – Auftragsabwicklung",
        ["Kunde", "Techniker", "Reparaturauftrag", "Geraet", "Fehlerbefund", "Kostenvoranschlag", "KvaPosition", "Reparaturschritt", "Arbeitszeitbuchung", "Rechnung", "Reklamation"]),
    "klassen-fokus-3-disposition": ("cd : Fokus 3 – Ersatzteil-Disposition",
        ["Disponent", "Ersatzteil", "Lagerbestand", "ErsatzteilReservierung", "Lieferantenbestellung", "Bestellposition", "Lieferant", "Reparaturauftrag", "Filiale"]),
    "klassen-fokus-4-organisation": ("cd : Fokus 4 – Mandant, Filialen und Rollen",
        ["Person", "Kunde", "Mitarbeiter", "Techniker", "Disponent", "Werkstattleiter", "Werkstattbetrieb", "Filiale"]),
}


UC_GROUPS = [
    ("Kundenportal (App)", ["UC01", "UC02", "UC07"]),
    ("Auftrag und Werkstatt", ["UC03", "UC17", "UC04", "UC05", "UC06", "UC13", "UC14", "UC15", "UC16"]),
    ("Ersatzteil-Disposition", ["UC08", "UC09", "UC10", "UC11", "UC12"]),
    ("Administration", ["UC18"]),
]
RIGHT_ACTORS = ["Lieferant", "KIDienst"]


def usecase_puml():
    names = dict(USECASES)
    L = ["@startuml", "left to right direction", "skinparam packageStyle rectangle",
         "skinparam defaultFontName Arial", "skinparam usecaseFontSize 11", "skinparam actorStyle awesome",
         "skinparam nodesep 12", "skinparam ranksep 60",
         "title ud : RepairFlow – Use-Case-Diagramm", ""]
    for aid, an, kind, desc in ACTORS:
        if aid in RIGHT_ACTORS:
            continue
        L.append('actor "%s" as %s' % (an, aid))
    L.append("")
    L.append('rectangle "RepairFlow" {')
    for gname, ucs in UC_GROUPS:
        L.append('  rectangle "%s" {' % gname)
        for u in ucs:
            L.append('    usecase "%s" as %s' % (names[u], u))
        L.append("  }")
    L.append("}")
    L.append("")
    for aid, an, kind, desc in ACTORS:
        if aid in RIGHT_ACTORS:
            L.append('actor "%s" as %s <<extern>>' % (an, aid))
    L.append("")
    for aid, ucs in ACTOR_UC:
        for u in ucs:
            if aid in RIGHT_ACTORS:
                L.append("%s -- %s" % (u, aid))
            else:
                L.append("%s -- %s" % (aid, u))
    L.append("")
    for base, inc in INCLUDES:
        L.append("%s ..> %s : <<include>>" % (base, inc))
    for ext, base in EXTENDS:
        L.append("%s ..> %s : <<extend>>" % (ext, base))
    L.append("@enduml")
    return "\n".join(L) + "\n"


# ----------------------------------------------------------------------------- XMI 2.1

def xmi():
    ids = {}
    counter = [0]

    def nid(prefix):
        counter[0] += 1
        return "%s_%d" % (prefix, counter[0])

    prim = ["String", "int", "double", "boolean", "Date", "void"]
    X = []
    A = X.append
    A('<?xml version="1.0" encoding="UTF-8"?>')
    A('<xmi:XMI xmi:version="2.1" xmlns:xmi="http://schema.omg.org/spec/XMI/2.1" xmlns:uml="http://schema.omg.org/spec/UML/2.1">')
    A('  <xmi:Documentation exporter="RepairFlow Modellgenerator" exporterVersion="1.0"/>')
    A('  <uml:Model xmi:id="model_RepairFlow" name="RepairFlow">')
    # primitive types
    A('    <packagedElement xmi:type="uml:Package" xmi:id="pkg_types" name="Datentypen">')
    for p in prim:
        ids["type:" + p] = "type_" + p
        A('      <packagedElement xmi:type="uml:PrimitiveType" xmi:id="type_%s" name="%s"/>' % (p, p))
    A('    </packagedElement>')

    def type_id(t):
        if t in ids and False:
            pass
        base = t
        if base.startswith("List<") and base.endswith(">"):
            base = base[5:-1]
        if base in prim:
            return "type_" + base, t.startswith("List<")
        if base in ENUMS:
            return "enum_" + base, t.startswith("List<")
        return "class_" + base, t.startswith("List<")

    # ---- class model
    A('    <packagedElement xmi:type="uml:Package" xmi:id="pkg_klassen" name="Klassenmodell">')
    for e, lits in ENUMS.items():
        A('      <packagedElement xmi:type="uml:Enumeration" xmi:id="enum_%s" name="%s">' % (e, e))
        for lit in lits:
            A('        <ownedLiteral xmi:type="uml:EnumerationLiteral" xmi:id="%s" name="%s"/>' % (nid("lit"), lit))
        A('      </packagedElement>')
    vis_map = {"-": "private", "+": "public", "#": "protected"}
    for name, abstract, stereo, attrs, ops in CLASSES:
        A('      <packagedElement xmi:type="uml:Class" xmi:id="class_%s" name="%s"%s>' % (name, name, ' isAbstract="true"' if abstract else ""))
        for sub, sup in GENERALIZATIONS:
            if sub == name:
                A('        <generalization xmi:type="uml:Generalization" xmi:id="%s" general="class_%s"/>' % (nid("gen"), sup))
        for vis, an, at in attrs:
            tid, multi = type_id(at)
            aid_ = nid("attr")
            if multi:
                A('        <ownedAttribute xmi:type="uml:Property" xmi:id="%s" name="%s" visibility="%s" type="%s">' % (aid_, an, vis_map[vis], tid))
                A('          <lowerValue xmi:type="uml:LiteralInteger" xmi:id="%s" value="0"/>' % nid("lv"))
                A('          <upperValue xmi:type="uml:LiteralUnlimitedNatural" xmi:id="%s" value="*"/>' % nid("uv"))
                A('        </ownedAttribute>')
            else:
                A('        <ownedAttribute xmi:type="uml:Property" xmi:id="%s" name="%s" visibility="%s" type="%s"/>' % (aid_, an, vis_map[vis], tid))
        for vis, on, params, ret in ops:
            oid = nid("op")
            A('        <ownedOperation xmi:type="uml:Operation" xmi:id="%s" name="%s" visibility="%s">' % (oid, on, vis_map[vis]))
            if params:
                for p in params.split(","):
                    pn, pt = [x.strip() for x in p.split(":")]
                    tid, multi = type_id(pt)
                    A('          <ownedParameter xmi:type="uml:Parameter" xmi:id="%s" name="%s" direction="in" type="%s"/>' % (nid("par"), pn, tid))
            if ret and ret != "void":
                tid, multi = type_id(ret)
                A('          <ownedParameter xmi:type="uml:Parameter" xmi:id="%s" name="return" direction="return" type="%s"/>' % (nid("par"), tid))
            A('        </ownedOperation>')
        A('      </packagedElement>')

    def mult(m):
        if m == "*":
            return "0", "*"
        if ".." in m:
            lo, hi = m.split("..")
            return lo, hi
        return m, m

    for a, ma, kind, b, mb, name in ASSOCIATIONS:
        if kind == "dep":
            A('      <packagedElement xmi:type="uml:Dependency" xmi:id="%s" name="%s" client="class_%s" supplier="class_%s"/>' % (nid("dep"), escape(name), a, b))
            continue
        asid = nid("assoc")
        e1, e2 = nid("end"), nid("end")
        A('      <packagedElement xmi:type="uml:Association" xmi:id="%s" name="%s" memberEnd="%s %s">' % (asid, escape(name), e1, e2))
        for eid, typ, m, agg in ((e1, a, ma, "none"), (e2, b, mb, {"comp": "composite", "agg": "shared"}.get(kind, "none"))):
            lo, hi = mult(m)
            A('        <ownedEnd xmi:type="uml:Property" xmi:id="%s" name="%s" type="class_%s" association="%s" aggregation="%s">' % (eid, typ[0].lower() + typ[1:], typ, asid, agg))
            A('          <lowerValue xmi:type="uml:LiteralInteger" xmi:id="%s" value="%s"/>' % (nid("lv"), lo))
            A('          <upperValue xmi:type="uml:LiteralUnlimitedNatural" xmi:id="%s" value="%s"/>' % (nid("uv"), hi))
            A('        </ownedEnd>')
        A('      </packagedElement>')
    A('    </packagedElement>')

    # ---- use case model
    A('    <packagedElement xmi:type="uml:Package" xmi:id="pkg_usecases" name="Anwendungsfallmodell">')
    for aid, an, kind, desc in ACTORS:
        A('      <packagedElement xmi:type="uml:Actor" xmi:id="actor_%s" name="%s">' % (aid, escape(an)))
        A('        <ownedComment xmi:type="uml:Comment" xmi:id="%s" body="%s"/>' % (nid("cmt"), escape("%s: %s" % (kind, desc), {'"': "&quot;"})))
        A('      </packagedElement>')
    A('      <packagedElement xmi:type="uml:Component" xmi:id="subject_RepairFlow" name="RepairFlow">')
    A('      </packagedElement>')
    for uid, un in USECASES:
        A('      <packagedElement xmi:type="uml:UseCase" xmi:id="uc_%s" name="%s" subject="subject_RepairFlow">' % (uid, escape(un)))
        for base, inc in INCLUDES:
            if base == uid:
                A('        <include xmi:type="uml:Include" xmi:id="%s" addition="uc_%s"/>' % (nid("inc"), inc))
        for ext, base in EXTENDS:
            if ext == uid:
                A('        <extend xmi:type="uml:Extend" xmi:id="%s" extendedCase="uc_%s"/>' % (nid("ext"), base))
        A('      </packagedElement>')
    for aid, ucs in ACTOR_UC:
        for u in ucs:
            asid = nid("aassoc")
            e1, e2 = nid("end"), nid("end")
            A('      <packagedElement xmi:type="uml:Association" xmi:id="%s" memberEnd="%s %s">' % (asid, e1, e2))
            A('        <ownedEnd xmi:type="uml:Property" xmi:id="%s" type="actor_%s" association="%s"/>' % (e1, aid, asid))
            A('        <ownedEnd xmi:type="uml:Property" xmi:id="%s" type="uc_%s" association="%s"/>' % (e2, u, asid))
            A('      </packagedElement>')
    A('    </packagedElement>')
    A('  </uml:Model>')
    A('</xmi:XMI>')
    return "\n".join(X) + "\n"


if __name__ == "__main__":
    import os, sys
    out = sys.argv[1] if len(sys.argv) > 1 else "uml"
    os.makedirs(out, exist_ok=True)
    # Dateinamen nach Repo-Konvention (claude.readme/CLAUDE.md): kein Projekt-Präfix, PNG und PUML mit gleichem Basisnamen
    open(os.path.join(out, "klassen.puml"), "w", encoding="utf-8").write(class_puml())
    for fn, (title, subset) in FOCUS.items():
        open(os.path.join(out, "%s.puml" % fn), "w", encoding="utf-8").write(class_puml(subset, title))
    open(os.path.join(out, "usecase.puml"), "w", encoding="utf-8").write(usecase_puml())
    open(os.path.join(out, "modell.xmi"), "w", encoding="utf-8").write(xmi())
    print("classes:", len(CLASSES), "enums:", len(ENUMS), "associations:", len(ASSOCIATIONS), "usecases:", len(USECASES), "actors:", len(ACTORS))
