/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"m8cdbKirKA3UTQ7q","label":"personal","bookmarks":[{"id":"hSj3RbkcqoJdUFc1","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"jbWnOmbOpCoMWeWB","label":"docs","url":"https://docs.google.com/document/u/0/"}]},{"id":"IGd8VExN3DfmZCv9","label":"social-media","bookmarks":[{"id":"q1AYrTrn3TRxsTiV","label":"facebook","url":"https://www.facebook.com/"},{"id":"Pqm0QtOXfb47IP8I","label":"twitter","url":"https://twitter.com/home"},{"id":"aaxdeilyy9vTQgrZ","label":"youtube","url":"https://www.youtube.com/"},{"id":"ssyfqGLovvGQG4ZO","label":"insta","url":"https://www.instagram.com/"}]},{"id":"3QaCdKY2b9ArF8Ad","label":"anime","bookmarks":[{"id":"siCnCnN09jKMeWtV","label":"anime","url":"https://anix.to/home"},{"id":"ZJZjqsBqlZFRRbAp","label":"manga","url":"https://manga4life.com/"},{"id":"qLJVN8K7MfkNuzZW","label":"movies","url":"https://fmoviesz.to/home"}]},{"id":"kf5HvfEsI7HJjN0Z","label":"others","bookmarks":[{"id":"ECsphRzDFE8aMBIW","label":"roblox","url":"https://www.roblox.com/home"},{"id":"6ksAp8GcsIcx4DSQ","label":"star rail","url":"https://www.prydwen.gg/star-rail/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
