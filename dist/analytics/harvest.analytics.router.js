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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.harvestAnalyticsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HarvestAnalytics = __importStar(require("../analytics/harvest.analytics.service"));
exports.harvestAnalyticsRouter = express_1.default.Router();
exports.harvestAnalyticsRouter.get('/yield-trends-by-crop', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const yieldTrends = yield HarvestAnalytics.getYieldTrendsByCrop();
        return response.status(200).json(yieldTrends);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
exports.harvestAnalyticsRouter.get('/total-harvest/:municipality', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const municipality = req.params.municipality;
        const result = yield HarvestAnalytics.getTotalHarvestByCrops(municipality);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.harvestAnalyticsRouter.get('/total-harvest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cropPlanted = req.query.cropPlanted;
    const municipality = req.query.municipality;
    const startMonth = req.query.startMonth;
    const endMonth = req.query.endMonth || startMonth;
    const year = req.query.year;
    if (!cropPlanted || !municipality || !startMonth || !year) {
        return res
            .status(400)
            .send('Missing required query parameters: cropPlanted, municipality, startMonth, or year');
    }
    try {
        const data = yield HarvestAnalytics.getTotalHarvestByCrop(cropPlanted, municipality, startMonth, endMonth, year);
        res.json(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.harvestAnalyticsRouter.get('/municipalities-and-crops', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield HarvestAnalytics.getAllMunicipalitiesAndCrops();
        res.json(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
//# sourceMappingURL=harvest.analytics.router.js.map