const indexPage = `
  <article class="container vh-100">
    <div class="row align-items-center h-100">
      <section class="col-6 d-md-block d-none text-center">
        <img class="img-fluid" src="./assets/images/logo_lg.png" alt="logo_lg">
        <img class="img-fluid" src="./assets/images/image.png" alt="image">
      </section>
      <section class="col-md-6 fw-bold" id="js-loginRegister-control">
      </section>
    </div>
  </article>

  <button id="btnShow" type="button" class="btn btn-primary">Modal</button>
  <div class="modal fade" tabindex="-1" id="testModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="btnSave">Save</button>
        </div>
      </div>
    </div>
  </div>
`

export { indexPage }