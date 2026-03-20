# Follow-the-Sun Support Model & Regional SLAs

## Regional Support Hubs

| Region | Hours (Local) | Language | Timezone | Hub Location |
|---|---|---|---|---|
| AMER (NA) | 08:00 - 20:00 | English, Spanish | UTC-5 / UTC-8 | Virginia / Austin |
| AMER (LatAm) | 08:00 - 20:00 | Spanish, Portuguese | UTC-3 / UTC-5 | Mexico City / São Paulo |
| EMEA | 08:00 - 20:00 | English, Portuguese | UTC+1 / UTC+0 | Lisbon / Madrid |

## Handover Protocol (The "Sun" Shift)

- **Handover Window**: 30-minute overlap between shifts.
- **Sync Method**: Critical ticket review via War-Room Bridge.
- **Evidence**: Handover log signed by shift leads in `ops/support/handovers/`.

## L1/L2/L3 Regional Formalization

- **L1 (General Support)**: Native language support in every target country. Response < 15min for Sev-1.
- **L2 (Technical/Functional)**: Regional experts in fiscal/banking regulations. Response < 30min for Sev-1.
- **L3 (SRE/Engineering)**: Global core team with on-call rotation. Response < 15min for Sev-1 escalation.

## Target SLAs by Customer Segment

| Segment | Availability | Sev-1 Response | Sev-1 Mitigation |
|---|---|---|---|
| Enterprise | 99.99% | 15 min | 1 hour |
| Business | 99.95% | 30 min | 4 hours |
| Standard | 99.9% | 2 hours | 1 business day |
