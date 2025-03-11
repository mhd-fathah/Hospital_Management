export class BaseController {
    renderView(res, view, data = {}) {
        res.render(view, data);
    }
}
