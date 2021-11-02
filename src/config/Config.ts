import ProdConfig from "./ProdConfig";
import DevConfig from "./DevConfig";

export function getConfig() {
    if (process.env.NODE_ENV === "production") {
        return ProdConfig;
    } else {
        return DevConfig;
    }
}