export class BaseController {
    renderView(res, view, data = {}) {
        res.render(view, data);
    }
    sendSuccess(res, message, data = null) {
        res.status(200).json({ success: true, message, data });
    }
    sendNotFound(res, message) {
        res.status(404).json({ success: false, message });
    }
    sendError(res, message, error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message, error: error.message || error });
    }
}
