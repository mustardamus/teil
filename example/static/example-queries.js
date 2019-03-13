/* globals document, fetch */

const queries = [
  {
    method: 'GET',
    url: '/simple'
  },
  {
    method: 'GET',
    url: '/simple/hello/friend'
  },
  {
    method: 'POST',
    url: '/simple',
    body: { works: true }
  }
]

const request = (url, opt) => {
  opt.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (opt.body) {
    opt.body = JSON.stringify(opt.body)
  }

  return fetch(url, opt).then(res => res.json())
}

queries.forEach(query => {
  request(query.url, query)
    .then(response => {
      const el = document.createElement('div')
      el.innerHTML = `
        <div class="request">
          <h1>
            <span class="method">${query.method}</span>
            <span class="url">${query.url}</span>
          </h1>
          <pre class="response">${JSON.stringify(response, null, 2)}</pre>
        </div>
      `

      return document.getElementsByTagName('body')[0].appendChild(el)
    })
    .catch(err => {
      throw err
    })
})
