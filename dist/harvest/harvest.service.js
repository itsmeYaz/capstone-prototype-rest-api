"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHarvest = exports.updateHarvest = exports.createHarvest = exports.getSingleHarvest = exports.listOfHarvests = void 0;
const db_server_1 = require("../utils/db.server");
const listOfHarvests = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.harvest.findMany({
        select: {
            id: true,
            date: true,
            quantity: true,
            productionId: true,
        },
    });
});
exports.listOfHarvests = listOfHarvests;
const getSingleHarvest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.harvest.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            date: true,
            quantity: true,
            productionId: true,
        },
    });
});
exports.getSingleHarvest = getSingleHarvest;
const createHarvest = (harvest) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, quantity, productionId } = harvest;
    return db_server_1.prisma.harvest.create({
        data: {
            date,
            quantity,
            productionId,
        },
        select: {
            id: true,
            date: true,
            quantity: true,
            productionId: true,
        },
    });
});
exports.createHarvest = createHarvest;
const updateHarvest = (harvest, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, quantity, productionId } = harvest;
    return db_server_1.prisma.harvest.update({
        where: {
            id,
        },
        data: {
            date,
            quantity,
            productionId,
        },
        select: {
            id: true,
            date: true,
            quantity: true,
            productionId: true,
        },
    });
});
exports.updateHarvest = updateHarvest;
const deleteHarvest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.prisma.harvest.delete({
        where: {
            id,
        },
    });
});
exports.deleteHarvest = deleteHarvest;
//# sourceMappingURL=harvest.service.js.map