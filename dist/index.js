"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const farmer_router_1 = require("./farmer/farmer.router");
const geographical_router_1 = require("./geographical/geographical.router");
const production_router_1 = require("./production/production.router");
const harvest_router_1 = require("./harvest/harvest.router");
const harvest_analytics_router_1 = require("./analytics/harvest.analytics.router");
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10) || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/farmers', farmer_router_1.farmerRouter);
app.use('/api/geographical', geographical_router_1.geographicalRouter);
app.use('/api/production', production_router_1.productionRouter);
app.use('/api/harvest', harvest_router_1.harvestRouter);
app.use('/api/analytics/', harvest_analytics_router_1.harvestAnalyticsRouter);
app.listen(PORT, () => {
    console.log(`listening on PORT: http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map