import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/services/language/language.service';
import { getRandomBetween, wait } from '../../libraries/utils'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  language = "en";
  languageSubsc = new Subscription();

  constructor(private languageSrc: LanguageService) {
    this.languageSubsc = this.languageSrc.getLanguageObserver().subscribe((val) => this.language = val)
  }

  ngOnInit(): void {
    this.write();
    initObserver();
  }

  async write() {
    const el = document.querySelector('[data-type]') as HTMLElement;
    const text = el.innerText;
    const { length } = text;
    const typeMin = parseInt(el.dataset['typeMin'] as string);
    const typeMax = parseInt(el.dataset['typeMax'] as string);
    while (true) {//to the infinite
      let soFar = '';
      for (let i = 0; i < length; i++) {
        soFar += text[i];
        el.innerText = soFar;
        await wait(getRandomBetween(typeMin, typeMax));
        if (i === length - 1) {
          await wait(3500);
        }
      }
    }
  }
}
function initObserver() {
  const typerHeader: any = document.querySelector('.typer-header');
  // const body: any = document.querySelector('body');
  const links = Array.from(document.querySelectorAll('.footer-a'))
  function obCallback(entries: any, ob: any) {
    entries.forEach(async (entry: any) => {
      if (entry.isIntersecting) {
        console.log('applying classes!');
        // ob.unobserve(terms.lastElementChild); // scape
        links.forEach((link) => { link.classList.add('bigger') })
        await wait(2000);
        links.forEach((link) => { link.classList.remove('bigger') })

      }
      // else {
      //   console.log('removing classes');
      //   links.forEach((link) => { link.classList.remove('bigger') })
      // }
    });
  }
  const ob = new IntersectionObserver(obCallback);
  console.log('ob', ob);
  console.log('typerHeader', typerHeader);
  if (typerHeader) {
    console.log('typerHeader.lastElementChild', typerHeader.lastElementChild)
    ob.observe(typerHeader.lastElementChild);
  }
}