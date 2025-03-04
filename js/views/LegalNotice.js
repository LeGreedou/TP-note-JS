
export default class LegalNotice {

    async render() { 
        
        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Articles example</h1>
                        <p class="lead text-body-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, aliquid voluptas sit aperiam quis architecto quaerat vel ratione placeat delectus repellendus cum animi sequi amet corporis minima ab, nisi at!</p>
                        <p>
                            <a href="" class="btn btn-primary my-2">Main call to action</a>
                            <a href="" class="btn btn-secondary my-2">Secondary action</a>
                        </p>
                    </div>
                </div>
            </section>
            <h2>Les 3 premiers articles</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            </div>
        `;
    }
}