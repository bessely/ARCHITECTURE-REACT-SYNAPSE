import React, { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BASEROOT } from '../services/serveur';

//lazy loading permet de charger les composants uniquement au besoin  { ça rend l'appli plus lentes en principe mais plus performante et moin groumande en memoire mais une fois builder la lenteur est imperceptible pour le client}
const Agence          = lazy(() => import("../pages/agence/Agence"));
const Valeur          = lazy(() => import("../pages/valeur/valeur"));
const Audit           = lazy(() => import("../pages/audit/Audit"));
const Forget          = lazy(() => import("../pages/forget/Forget"));
const Dashboard       = lazy(() => import("../pages/dashboard/Dashboard"));
const PasswordForget  = lazy(() => import("../pages/passwordForget/PasswordForget"));
const Profil          = lazy(() => import("../pages/profil/Profil"));
const Connexion       = lazy(() => import("../pages/connexion/Connexion"));
const Utilisateur     = lazy(() => import("../pages/utilisateur/Utilisateur"));
const PageNotFound    = lazy(() => import("../pages/PageNotFound"));

function RoutesApp() {
    return (
        <Router basename={BASEROOT}>
            <Routes>
                <Route path = "/"                element={<Dashboard       />} />
                <Route path = "/Agence"          element={<Agence          />} />
                <Route path = "/Valeur"          element={<Valeur          />} />
                <Route path = "/Audit"           element={<Audit           />} />
                <Route path = "/PasswordForget"  element={<PasswordForget  />} />
                <Route path = "/Profil"          element={<Profil          />} />
                <Route path = "/Utilisateur"     element={<Utilisateur     />} />
                <Route path = "/Connexion"       element={<Connexion       />} />
                <Route path = "/Forget"          element={<Forget          />} />
                <Route path = "/PageNotFound"    element={<PageNotFound    />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp