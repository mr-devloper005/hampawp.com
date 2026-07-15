import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

// hampawp.com playful directory palette:
// - #B5B9F0 (lavender)   — primary CTA buttons, brand signature
// - #408175 (teal)       — links, active nav, secondary accents
// - #2E4540 (dark teal)  — trust band gradient, hover darken
// - #0B0909 (near-black) — dark sections, footer, page text
export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents: {
    primary: '#B5B9F0',
    secondary: '#408175',
    surface: '#ffffff',
  },
} as const
