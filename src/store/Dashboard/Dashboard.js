import { createSlice } from "@reduxjs/toolkit";
import { loadDashboardOne } from "../../services/Dashboard.js";
import { STATUS } from "../../services/globalConstante.js";

/** DASHBOARD [CONVERGENCE] SYNAPSE GROUPE
* !!CENTRALISATION DES STATES DU DASHBOARD
*@bessely
*@Author  : YAO BESSELY SUNDAY JUNIOR : +2250709116844 besselymail@gmail.com
*         :Codez en pensant que celui qui maintiendra votre code est un psychopathe qui connaît votre adresse.
*/

const initialState = {
  status          : { dashboard: STATUS.SUCCESS },
  suspensAncMtx   : [],
  suspensAncMvt   : [],
  MntCumSusp      : [],
  NbreOpeSus      : [],
  mntRappOpeCorr  : [],
  mntComptRappNos : [],
  mntSuspOpeCorr  : [],
  mntSuspImpMvt   : [],
  mntSuspImpMtx   : [],
  mntComptSuspNos : [],
  NmbrOpeRappCorr : [],
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
        setStatus        (state, action) { state.status        = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardOne.pending, (state, action) => {
          state.status.dashboard = STATUS.LOADING;
      })
      .addCase(loadDashboardOne.fulfilled, (state, action) => {
        if (action.payload!==undefined ) {
          console.log(action.payload);
          let list              = [];
          state.suspensAncMvt   = action.payload.mntSuspAncienMvt ?? [];
          state.suspensAncMtx   = action.payload.mntSuspAnciensMtx ?? [];
          state.mntSuspImpMvt   = action.payload.mntSuspImpMvt ?? [];
          state.mntSuspImpMtx   = action.payload.mntSuspImpMtx ?? [];
          state.mntComptRappNos = action.payload.mntComptRappNos !== undefined ? action.payload.mntComptRappNos[0] : [];
          state.mntRappOpeCorr  = action.payload.mntRappOpeCorr !== undefined ? action.payload.mntRappOpeCorr[0] : [];
          state.mntSuspOpeCorr  = action.payload.mntSuspOpeCorr !== undefined ?  action.payload.mntSuspOpeCorr[0] : [];
          state.mntComptSuspNos = action.payload.mntComptSuspNos !== undefined ?  action.payload.mntComptSuspNos[0] : [];
          state.NmbrOpeRappCorr = action.payload.NmbrOpeRappCorr !== undefined ? action.payload.NmbrOpeRappCorr[0] : [];
          if (action.payload.MntCumSusp !== undefined && action.payload.MntCumSusp.length>0 ) {
              list = [];
              list.push(parseInt(action.payload.MntCumSusp[0].CreditMirr));
              list.push(parseInt(action.payload.MntCumSusp[0].CreditNos));
              list.push(parseInt(action.payload.MntCumSusp[0].DebitMirr));
              list.push(parseInt(action.payload.MntCumSusp[0].DebitNos));
              state.MntCumSusp = list;
          }
          if (action.payload.NbreOpeSus !== undefined && action.payload.NbreOpeSus.length>0) {
            list = [];
            list.push(parseInt(action.payload.NbreOpeSus[0].NBRECreditMirr));
            list.push(parseInt(action.payload.NbreOpeSus[0].NBRECreditNos));
            list.push(parseInt(action.payload.NbreOpeSus[0].NBREDebitMirr));
            list.push(parseInt(action.payload.NbreOpeSus[0].NBREDebitNos));
            state.NbreOpeSus = list;
          }
          state.status.dashboard = STATUS.SUCCESS;
        }
      })
      .addCase(loadDashboardOne.rejected, (state, action) => {
            state.status.dashboard = STATUS.ERROR;
      });
  },
});
export const { status } = DashboardSlice.actions;
export default DashboardSlice.reducer;


