import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class NotFound extends Component {
  render() {
    this.componentRoot.innerHTML = `요청하신 페이지를 찾을 수 없습니다<button class="not-found-button">홈으로 돌아가기 </button>`;
    this.componentRoot.classList.add('not-found');

    const notFoundButton =
      this.componentRoot.querySelector('.not-found-button');
    notFoundButton.addEventListener('click', () => navigate());
  }
}
