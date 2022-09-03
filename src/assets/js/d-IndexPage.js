function indexPage(content) {
  const layout = `
    <article class="container vh-100">
      <div class="row align-items-center h-100">
        <section class="col-6 d-md-block d-none text-center">
          <img class="img-fluid" src="./assets/images/logo_lg.png" alt="logo_lg">
          <img class="img-fluid" src="./assets/images/image.png" alt="image">
        </section>
        <section class="col-md-6 fw-bold">
          ${content}
        </section>
      </div>
    </article>
  `
  return layout
}

export { indexPage }