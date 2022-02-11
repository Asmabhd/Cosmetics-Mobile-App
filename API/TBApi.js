import React, { Component } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";

export function getFilmsFromApiWithSearchedText(text) {
  const url = "https://asmabh.herokuapp.com/api/produit";

  return fetch(url)
    .then((response) => response.json())

    .catch((error) => console.log(error));
}
// Récupération du détail d'un produit
export function getFilmDetailFromApi(id) {
  return fetch("https://asmabh.herokuapp.com/api/produit/" + id)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Récupération du détail d'une recette
export function getrecetteDetailFromApi(id) {
  return fetch("https://asmabh.herokuapp.com/api/recette/" + id)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
export function getscannerDetailFromApi(id) {
  return fetch("https://asmabh.herokuapp.com/api/scanner/" + id)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
export function getDetailFromApi(codeBarre) {
  return fetch("https://asmabh.herokuapp.com/api/scannerBy/" + codeBarre)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
