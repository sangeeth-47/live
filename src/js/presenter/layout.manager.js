import HeaderSection from "./sections/header.section.js";
import SidebarSection from "./sections/sidebar.section.js";
import PendingSection from "./sections/pending.section.js";
import StatisticsSection from "./sections/statistics.section.js";
import ViewersSection from "./sections/viewers.section.js";

export default class LayoutManager {

    constructor(container) {

        this.container = container;

    }

    create() {

        const dashboard = document.createElement("div");

        dashboard.className = "presenter-dashboard";

        dashboard.append(

            HeaderSection.create(),

            SidebarSection.create(),

            PendingSection.create(),

            StatisticsSection.create(),

            ViewersSection.create()

        );

        this.container.append(dashboard);

    }

}