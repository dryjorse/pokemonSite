import React from "react";
import s from './footer.module.css'
import instagram from '../../img/footerImg/instagram.svg'
import facebook from '../../img/footerImg/facebook.svg'
import telegram from '../../img/footerImg/telegram.svg'
import youtube from '../../img/footerImg/youtube.svg'

function Footer () {
    return (
        <div className={s.footer}>
            <span className={s.text}>Подпишитесь на нас!</span>
            <div className={s.contacts}>
                <ul className={s.social}>
                    <li className={s.socialList}><a target='_blank' href="https://www.instagram.com/" className={s.socialLink}><img src={instagram} alt="instagram" /></a></li>
                    <li className={s.socialList}><a target='_blank' href="https://ru-ru.facebook.com/" className={s.socialLink}><img src={facebook} alt="facebook" /></a></li>
                    <li className={s.socialList}><a target='_blank' href="https://telegram.org/" className={s.socialLink}><img src={telegram} alt="telegram" /></a></li>
                    <li className={s.socialList}><a target='_blank' href="https://www.youtube.com/" className={s.socialLink}><img src={youtube} alt="youtube" /></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;