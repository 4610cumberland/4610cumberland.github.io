# 4610 Cumberland — Site Instructions

## How the Gallery Works

The gallery is driven entirely by `image_descriptions.json`. No HTML changes needed when adding or removing photos.

- `script.js` fetches `image_descriptions.json` at page load and renders each entry as a gallery tile with lightbox support.
- Image files live in `images/` as `{image_id}.jpg`.
- Order in the JSON = order on the page. The lightbox counter reflects the total automatically.
- Raw originals are archived in `raw/` and never served to visitors.

### Special Images (hardcoded in index.html)

| Role | Image | Location |
|------|-------|----------|
| Hero | `img_2250` | `<header class="hero">` — primary facade |
| Feature break | `img_2275` | `<section class="feature-break">` — screened porch at dusk |

If either of these is replaced, update the `src` in `index.html` as well.

## Gallery Tour Order

Photos are sequenced as a walk-through of the property:

1. **Exterior** — facade, entrance, porch, front door
2. **Entry** — entryway, hallway
3. **Dining** — coffered ceiling, table, flow into living room
4. **Kitchen** — island, appliances, details, views into living area
5. **Living Room** — fireplace, piano, views, seating
6. **Game/Media Room** — wide shot, TV/workspace, dual monitors
7. **Screened Porch & Deck** — covered deck, screened porch, railing/patio view
8. **Pool & Patio** — pool overview, waterfall, hot tub, fire pit, lounging
9. **Yard, Gardens & Chickens** — lawn, swing set, coop, flowers, garden, wooded lot
10. **Trails** — wooded path, stone borders
11. **Recreation** — basketball, ping pong
12. **Garage Gym** — climbing wall, power rack, rower, weights
13. **Pool Equipment** — filtration/heating (last, utilitarian)

When adding new photos, slot them into the appropriate section and maintain this flow.

## Adding New Photos

1. Place the raw original in `raw/`.
2. Create a web-optimized `.jpg` in `images/` named `img_XXXX.jpg` (matching the original's number).
3. Add a JSON entry in `image_descriptions.json` at the correct position in tour order.
4. Each entry: `{ "image_id": "img_XXXX", "description": "..." }`

## Description Conventions

- **Be specific, not generic.** Describe what's actually visible, not filler.
- **Name rooms accurately:**
  - The fitness area in the garage is the **"garage gym"** (not "home gym," "home fitness area," or "recreation room").
  - Use "game room" for the main-level media/game room.
  - Use "screened porch" (not "sunroom" or "enclosed patio").
- **Differentiate similar shots.** If two photos show the same area, each description should highlight what makes that angle distinct (e.g., one emphasizes the waterfall feature, another emphasizes the paver patio).
- **No redundant adjectives.** Skip "beautiful," "stunning," "amazing." Describe the subject matter.
- Keep descriptions to one sentence, roughly 8–15 words.

## Curation Rules

- **Target ~3–7 photos per section.** More for visually rich areas (pool/patio), fewer for simple spaces (entry, trails).
- **No near-duplicates.** If two shots have the same subject from a similar angle, keep the better one.
- **Every photo should earn its spot.** Each image should show something the others don't — a different room, angle, detail, or time of day.
- **Current gallery: 48 photos.** When adding rooms not yet photographed (bedrooms, bathrooms, laundry, etc.), the total will grow but should stay curated — aim for quality over quantity.

## Rooms Not Yet in Gallery

These areas need photos added in future sessions:

- Primary bedroom + en suite bathroom
- Guest bedrooms (4)
- Hallway bathrooms (2)
- Laundry room
- Mudroom
- Garage (full view, not just gym corner)
- Basement/storage (if applicable)
