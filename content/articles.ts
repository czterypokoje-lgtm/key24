export const articles = {
  "en-GB": {
    preparation: {
      category: "CALL FLOW / PRACTICAL GUIDE",
      title: "Prepare a call flow that fits your working day.",
      intro:
        "Before adding automation, decide what a useful first conversation needs to achieve.",
      sections: [
        [
          "Map the calls you actually receive",
          "Write down your common enquiry types: lost keys, spare keys, damaged keys and general questions. Keep the list grounded in your service area and the work you accept.",
        ],
        [
          "Choose the minimum useful details",
          "For each enquiry, decide which vehicle details, location and contact information are necessary. Ask only for information you need; avoid sensitive documents in the first conversation.",
        ],
        [
          "Define the human handover",
          "List the questions and situations that require a person: pricing, availability, ownership checks and safety concerns. An automated conversation should not promise work you have not accepted.",
        ],
        [
          "Test the awkward cases",
          "Try incomplete vehicle information, a caller outside the service area and an unclear request. Check that uncertainty is visible rather than silently converted into a confident answer.",
        ],
        [
          "Agree the data responsibilities",
          "Confirm who can access enquiry data, where it is stored and when it should be deleted. Review the actual workflow and applicable requirements before going live.",
        ],
      ],
    },
    handover: {
      category: "OPERATIONS / PRACTICAL GUIDE",
      title: "What makes an enquiry ready for a callback?",
      intro:
        "A clear handover separates what is known, what needs checking and what should happen next.",
      sections: [
        [
          "Keep facts separate from assumptions",
          "Record what the caller said. If a vehicle model, location or key type is unclear, mark it for confirmation. Missing information is more useful than an invented answer.",
        ],
        [
          "Make the next action explicit",
          "A new enquiry is not an accepted job. Decide who should review it, whether a callback is needed and which details are still required.",
        ],
        [
          "Keep the conversation together",
          "Give your team a consistent place to review the original context and later follow-up. Avoid copying more personal information than the task requires.",
        ],
        [
          "Close the loop deliberately",
          "Update the enquiry when a decision has been made. If a follow-up message is appropriate, check that the channel and permissions are suitable before sending it.",
        ],
      ],
    },
  },
  "de-DE": {
    preparation: {
      category: "ANRUFABLAUF / PRAXISLEITFADEN",
      title: "Einen Anrufablauf für Ihren Arbeitsalltag vorbereiten.",
      intro:
        "Klären Sie vor der Automatisierung, was ein nützliches Erstgespräch leisten soll.",
      sections: [
        [
          "Die tatsächlichen Anrufe erfassen",
          "Notieren Sie typische Anliegen: verlorene Schlüssel, Ersatzschlüssel, beschädigte Schlüssel und allgemeine Fragen. Orientieren Sie die Liste am Einsatzgebiet und an den Aufträgen, die Sie annehmen.",
        ],
        [
          "Die nötigen Angaben auswählen",
          "Legen Sie für jedes Anliegen fest, welche Fahrzeug-, Standort- und Kontaktdaten nötig sind. Erfragen Sie nur, was Sie brauchen. Sensible Dokumente gehören nicht in das Erstgespräch.",
        ],
        [
          "Die menschliche Übergabe definieren",
          "Benennen Sie Fragen und Situationen für einen Menschen: Preise, Verfügbarkeit, Berechtigungsprüfung und Sicherheitsfragen. Ein automatisiertes Gespräch darf keine unbestätigten Aufträge versprechen.",
        ],
        [
          "Schwierige Fälle testen",
          "Testen Sie unvollständige Fahrzeugdaten, Anrufer außerhalb des Einsatzgebiets und unklare Anliegen. Unsicherheit muss sichtbar bleiben und darf nicht als sichere Antwort erscheinen.",
        ],
        [
          "Verantwortung für Daten klären",
          "Bestätigen Sie, wer auf Anfragen zugreifen darf, wo Daten gespeichert werden und wann sie zu löschen sind. Prüfen Sie den tatsächlichen Ablauf und die geltenden Anforderungen vor dem Live-Betrieb.",
        ],
      ],
    },
    handover: {
      category: "BETRIEB / PRAXISLEITFADEN",
      title: "Wann ist eine Anfrage bereit für den Rückruf?",
      intro:
        "Eine klare Übergabe trennt Bekanntes, offene Fragen und den nächsten Schritt.",
      sections: [
        [
          "Fakten und Annahmen trennen",
          "Halten Sie fest, was der Anrufer gesagt hat. Sind Modell, Standort oder Schlüsseltyp unklar, markieren Sie sie zur Bestätigung. Fehlende Informationen sind hilfreicher als erfundene Antworten.",
        ],
        [
          "Die nächste Aktion benennen",
          "Eine neue Anfrage ist noch kein angenommener Auftrag. Legen Sie fest, wer sie prüft, ob ein Rückruf nötig ist und welche Angaben noch fehlen.",
        ],
        [
          "Das Gespräch zusammenhalten",
          "Geben Sie dem Team einen einheitlichen Ort für ursprünglichen Kontext und spätere Nachverfolgung. Kopieren Sie nicht mehr personenbezogene Daten als erforderlich.",
        ],
        [
          "Bewusst abschließen",
          "Aktualisieren Sie die Anfrage nach einer Entscheidung. Ist eine Folgemitteilung sinnvoll, prüfen Sie vorher Kanal und Einwilligung.",
        ],
      ],
    },
  },
} as const;
