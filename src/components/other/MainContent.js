import React from "react";
import { useTranslation } from "react-i18next";

function MainContent() {
    const { t } = useTranslation();
    return (
        <main>
            <h2>{ t('main-page.content') }</h2>
            <p>
                Lorem ipsum dolor sit amet necessitatibus doloremque. Ducimus eum mollitia quisquam, facere doloribus sit! Tempore maiores, esse quis fuga, corrupti ut vero, neque vel inventore sint veritatis beatae quia ducimus dolore repellendus pariatur architecto culpa assumenda! Voluptates obcaecati debitis labore repellendus voluptas fugit itaque quo eaque repellat eveniet, laudantium voluptatem quos assumenda alias, quaerat ipsa,  quaerat asperns eum et suscipit ea optio rem debitis. Veritatis commodi cupiditate debitis placeat a corporis aperiam odit cumque architecto inventore, doloremque sint iure, est nam at provident ducimus?
            </p>
        </main>
    )
}

export default MainContent