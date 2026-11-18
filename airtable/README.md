# Airtable: Borrowed database

Base ID: `appMrOR9vAGCtxbCz`

## Tables

### Reservations (`tblxinjENwhpjglVt`)
| Field | Type | Notes |
|---|---|---|
| Name | Text | |
| Email | Email | |
| Look | Text | e.g. `For Him — Chrome Hearts Cross Patch Jeans`, `Watch — Rolex Submariner Date (126610LN)` |
| Collection | Single select | Formal · Interview-Ready · Grad Photos · Streetwear · By the Piece |
| Size | Text | Per part, e.g. `Tux jacket 40R · Tux trousers 32x30` |
| Event Type | Text | |
| Event Date | Date | |
| Heard About Us | Text | Optional |
| Source (UTM) | Text | e.g. `ig / social / link_in_bio` or `direct` |
| Submitted At | Date/time | Set by the server |

### Email List (`tblbFXoMwBUK6V46f`)
| Field | Type |
|---|---|
| Email | Email |
| Source | Text (UTM) |
| Submitted At | Date/time |

## Automation: "Website form → Airtable" (`wflDCrlY4zth1VE4j`)

1. **Trigger:** incoming webhook. Its URL is stored only in Netlify as `AIRTABLE_WEBHOOK_URL`, never in this repo.
2. **Condition:** `type == "reservation"`
   - **Yes →** create a record in **Reservations**
   - **No →** create a record in **Email List**

Payload sent by `netlify/functions/submit.mjs`:

```json
{
  "type": "reservation | signup",
  "name": "", "email": "", "look": "", "collection": "", "size": "",
  "eventType": "", "eventDate": "YYYY-MM-DD", "heardAbout": "",
  "utm": "", "submittedAt": "ISO timestamp"
}
```
