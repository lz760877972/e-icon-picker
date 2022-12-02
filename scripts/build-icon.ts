import elementPlus2 from "./icon/element-plus2.0"
import elementUI from "./icon/element-ui"
import fontAwesome470 from "./icon/font-awesome.v4.7.0"
import fontAwesome6XX from "./icon/fontawesome-6.x.x"

const icon =async () => {
    await elementPlus2();
    // await elementPlus();
    await elementUI();
    await fontAwesome470();
    // await fontAwesome5XX();
    // await fontAwesome5XXPro();
    await  fontAwesome6XX();
}
icon()
