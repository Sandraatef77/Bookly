export function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'message';
    toast.textContent = message;
    document.body.append(toast);
    setTimeout(function () {
        return toast.remove();
    }, 2000);
}
