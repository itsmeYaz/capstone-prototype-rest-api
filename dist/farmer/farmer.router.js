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
exports.farmerRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const FarmerService = __importStar(require("./farmer.service"));
exports.farmerRouter = express_1.default.Router();
//Get list of farmers
exports.farmerRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmers = yield FarmerService.listFarmers();
        return response.status(200).json(farmers);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//Get single farmer by ID
exports.farmerRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const farmer = yield FarmerService.getFarmer(id);
        if (farmer) {
            return response.status(200).json(farmer);
        }
        return response.status(404).json('farmer not found');
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//POST: create farmer
//Params:
exports.farmerRouter.post('/', (0, express_validator_1.body)('firstname').isString(), (0, express_validator_1.body)('middlename').isString(), (0, express_validator_1.body)('lastname').isString(), (0, express_validator_1.body)('birthdate').isDate().toDate(), (0, express_validator_1.body)('gender').isString(), (0, express_validator_1.body)('municipality').isString(), (0, express_validator_1.body)('baranggay').isString(), (0, express_validator_1.body)('sitio').isString(), (0, express_validator_1.body)('phoneNumber').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const farmer = request.body;
        const newFarmer = yield FarmerService.createFarmer(farmer);
        return response.status(201).json(newFarmer);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//UPDATE farmer
exports.farmerRouter.put('/:id', (0, express_validator_1.body)('firstname').isString(), (0, express_validator_1.body)('middlename').isString(), (0, express_validator_1.body)('lastname').isString(), (0, express_validator_1.body)('birthdate').isDate().toDate(), (0, express_validator_1.body)('gender').isString(), (0, express_validator_1.body)('municipality').isString(), (0, express_validator_1.body)('baranggay').isString(), (0, express_validator_1.body)('sitio').isString(), (0, express_validator_1.body)('phoneNumber').isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    try {
        const farmer = request.body;
        const updateFarmer = yield FarmerService.updateFarmer(farmer, id);
        return response.status(200).json(updateFarmer);
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//DELETE farmer based on id
exports.farmerRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        yield FarmerService.deleteFarmer(id);
        return response.status(204).json('Farmer successfully deleted.');
    }
    catch (err) {
        return response.status(500).json(err.message);
    }
}));
//# sourceMappingURL=farmer.router.js.map