import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, computed, observable, runInAction } from "mobx";

class AppStore extends BaseStore {
  @observable ready = false;
  @observable toasts = [];

  @action
  pushToast = toast => {
    if (!toast) return;
    this.toasts = [...this.toasts, toast];
    if (toast.timeout) {
      setTimeout(() => {
        runInAction(() => {
          this.removeToast({ ...toast });
        });
      }, toast.timeout);
    }
  };

  @action
  removeToast = toast => {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  };

  @computed
  get isAppReady() {
    return this.ready;
  }

  @action
  setAppReady = () => {
    this.ready = true;
  };
}

export const getAppStore = getOrCreateStore("app", AppStore);
