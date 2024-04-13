'use client'

import { createContext, useContext, useState } from 'react'

const RegisterContext = createContext({})

const sampleState = {
  ['televizni_vysielatelia']: {
    name: 'Televízni vysielatelia',
    attributes: [
      { type: 'string', name: 'Vysielateľ', required: true, private: false, unique: true },
      { type: 'string', name: 'Názov', required: true, private: false, unique: true },
      { type: 'string', name: 'Obchodné meno', required: true, private: false, unique: true, hint: 'Je oficiálnym názvom, pod ktorým podnikateľ alebo právnická osoba vykonáva svoju činnosť alebo obchoduje.' },
      { type: 'string', name: 'Meno a priezvisko', required: true, private: false, unique: false },
      {
        type: 'object', name: 'Adresa sídla', required: true, private: false, unique: false, innerAttributes: [
          { type: 'string', name: 'Ulica', required: true, private: false, unique: false },
          { type: 'string', name: 'Mesto', required: true, private: false, unique: false },
          { type: 'string', name: 'PSČ', required: true, private: false, unique: false }
        ]
      },
      { type: 'string', name: 'Miesto podnikania', required: false, private: false, unique: false },
      { type: 'string', name: 'Bydlisko', required: false, private: true, unique: false },
      { type: 'number', name: 'Telefónne číslo', required: true, private: true, unique: true },
      { type: 'string', name: 'Adresa elektronickej pošty', required: true, private: true, unique: true },
      { type: 'number', name: 'Číslo autorizácie', required: true, private: false, unique: true, hint: 'Je identifikačné číslo, ktoré je pridelené k určitému povoleniu, schváleniu alebo autorizácii. Môže to byť napríklad číslo udelené pri schvaľovaní platby, transakcie alebo operácie.' },
      { type: 'string', name: 'Názov programovej služby', required: true, private: false, unique: true, hint: 'Je označenie, ktoré identifikuje určitú programovú službu, či už ide o softvérový produkt, webovú aplikáciu alebo iný druh programu poskytovaného na účely používania, prístupu alebo iného využitia.' },
      {
        type: 'object', name: 'Pomocne údaje', required: true, private: false, unique: false, innerAttributes: [
          { type: 'string', name: 'Údaj o štandarde digitálneho príjmu', required: true, private: false, unique: false },
          { type: 'string', name: 'Údaj o základnom spôsobe verejného prenosu', required: true, private: false, unique: false },
          { type: 'boolean', name: 'Údaj či ide o lokálne vysielanie', required: true, private: false, unique: false },
          { type: 'boolean', name: 'Údaj či ide o komunitné vysielanie', required: true, private: false, unique: false },
          { type: 'boolean', name: 'Údaj či ide o monotypovú programovú službu', required: true, private: false, unique: false },
          { type: 'boolean', name: 'Údaj či ide o vysielanie programovej služby prostredníctvom internetu', required: true, private: false, unique: false },
          { type: 'boolean', name: 'Údaj o predbežnom zaradení vysielanej televíznej programovej služby na účely prístupu verejnosti k významným podujatiam', required: true, private: false, unique: false }
        ]
      },
      { type: 'string', name: 'Jazyk vysielania', required: true, private: false, unique: false },
      { type: 'string', name: 'Časový rozsah vysielania programovej služby', required: true, private: false, unique: false },
    ],
    data: [{
      Vysielateľ: "Sample Vysielateľ",
      Názov: "Sample Názov",
      Obchodné_meno: "Sample Obchodné meno",
      Meno_a_priezvisko: "Sample Meno a priezvisko",
      Adresa_sídla: {
        Ulica: "Sample Ulica",
        Mesto: "Sample Mesto",
        PSČ: "Sample PSČ"
      },
      Miesto_podnikania: "Sample Miesto podnikania",
      Bydlisko: "Sample Bydlisko",
      Telefónne_číslo: 123456789,
      Adresa_elektronickej_pošty: "sample@email.com",
      Číslo_autorizácie: 123456,
      Názov_programovej_služby: "Sample Názov programovej služby",
      Pomocne_údaje: {
        Údaj_o_štandarde_digitálneho_príjmu: "Sample Údaj o štandarde digitálneho príjmu",
        Údaj_o_základnom_spôsobe_verejného_prenosu: "Sample Údaj o základnom spôsobe verejného prenosu",
        Údaj_či_ide_o_lokálne_vysielanie: true,
        Údaj_či_ide_o_komunitné_vysielanie: false,
        Údaj_či_ide_o_monotypovú_programovú_službu: true,
        Údaj_či_ide_o_vysielanie_programovej_služby_prostredníctvom_internetu: false,
        Údaj_o_predbežnom_zaradení_vysielanej_televíznej_programovej_služby_na_účely_prístupu_verejnosti_k_významným_podujatiam: true
      },
      Jazyk_vysielania: "Sample Jazyk vysielania",
      Časový_rozsah_vysielania_programovej_služby: "Sample Časový rozsah vysielania programovej služby"
    }],
    events: [
      {}, {}
    ],
    published: [
      {}, {}
    ]
  },
}

export const RegisterProvider = ({ children }) => {
  const [state, setState] = useState(sampleState)

  return <RegisterContext.Provider value={{ ...state, _updateState: setState }}>
    {children}
  </RegisterContext.Provider>
}

export const useRegisterContext = () => {
  return useContext(RegisterContext)
}
