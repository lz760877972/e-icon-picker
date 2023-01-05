import {
    antDesign,
    arcoVueIcon,
    elementPlus2,
    elementUI,
    fontAwesome470,
    fontAwesome5XX,
    fontAwesome5XXPro,
    fontAwesome6XX,
    layuiVue,
    tdesignIcons
} from './icon';

const icon = async () => {
    await elementPlus2();
    // await elementPlus();
    await elementUI();
    await fontAwesome470();
    await fontAwesome5XX();
    await fontAwesome5XXPro();
    await fontAwesome6XX();
    await antDesign();
    await tdesignIcons();
    await arcoVueIcon();
    await layuiVue();
}
icon()
