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
exports.harvestRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const HarvestService = __importStar(require("./harvest.service"));
exports.harvestRouter = express_1.default.Router();
//GET list of harvest
exports.harvestRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const harvests = yield HarvestService.listOfHarvests();
        return response.status(200).json(harvests);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//GET single harvest
exports.harvestRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const harvest = yield HarvestService.getSingleHarvest(id);
        if (harvest) {
            return response.status(200).json(harvest);
        }
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//Create harvest
exports.harvestRouter.post('/', (0, express_validator_1.body)('date').isDate().toDate(), (0, express_validator_1.body)('quantity').isInt(), (0, express_validator_1.body)('productionId').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const harvest = request.body;
        const newHarvest = yield HarvestService.createHarvest(harvest);
        return response.status(201).json(newHarvest);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//Update Harvest
exports.harvestRouter.put('/:id', (0, express_validator_1.body)('date').isDate().toDate(), (0, express_validator_1.body)('quantity').isInt(), (0, express_validator_1.body)('productionId').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    try {
        const harvest = request.body;
        const updatedHarvest = yield HarvestService.updateHarvest(harvest, id);
        return response.status(201).json(updatedHarvest);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//DELETE existing harvest
exports.harvestRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        yield HarvestService.deleteHarvest(id);
        return response.status(204).json('Harvest successfully deleted.');
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//# sourceMappingURL=harvest.router.js.map