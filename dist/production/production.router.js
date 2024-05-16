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
exports.productionRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const ProductionService = __importStar(require("./production.service"));
exports.productionRouter = express_1.default.Router();
//GET list of productions
exports.productionRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const production = yield ProductionService.listOfProduction();
        return response.status(200).json(production);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//GET single production
exports.productionRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const production = yield ProductionService.getSingleProduction(id);
        if (production) {
            return response.status(200).json(production);
        }
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//POST create production
exports.productionRouter.post('/', (0, express_validator_1.body)('datePlanted').isDate().toDate(), (0, express_validator_1.body)('cropPlanted').isString(), (0, express_validator_1.body)('areaPlanted').isInt(), (0, express_validator_1.body)('existence').isString(), (0, express_validator_1.body)('dateHarvest').isDate().toDate(), (0, express_validator_1.body)('status').isString(), (0, express_validator_1.body)('farmerId').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const production = request.body;
        const newProduction = yield ProductionService.createProduction(production);
        return response.status(201).json(newProduction);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//Update existing production
exports.productionRouter.put('/:id', (0, express_validator_1.body)('datePlanted').isDate().toDate(), (0, express_validator_1.body)('cropPlanted').isString(), (0, express_validator_1.body)('areaPlanted').isInt(), (0, express_validator_1.body)('existence').isString(), (0, express_validator_1.body)('dateHarvest').isDate().toDate(), (0, express_validator_1.body)('status').isString(), (0, express_validator_1.body)('farmerId').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    try {
        const production = request.body;
        const updatedProduction = yield ProductionService.updateProduction(production, id);
        return response.status(201).json(updatedProduction);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//DELETE existing production
exports.productionRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        yield ProductionService.deleteProduction(id);
        return response.status(204).json('Production successfully deleted.');
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//# sourceMappingURL=production.router.js.map