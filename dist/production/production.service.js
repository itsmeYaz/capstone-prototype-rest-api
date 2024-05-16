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
exports.deleteProduction = exports.updateProduction = exports.createProduction = exports.getSingleProduction = exports.listOfProduction = void 0;
const db_server_1 = require("../utils/db.server");
const farmerSelectedAttribute = {
    id: true,
    createdAt: true,
    firstname: true,
    middlename: true,
    lastname: true,
    birthdate: true,
    gender: true,
    municipality: true,
    baranggay: true,
    sitio: true,
    phoneNumber: true,
};
const listOfProduction = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.production.findMany({
        select: {
            id: true,
            datePlanted: true,
            cropPlanted: true,
            areaPlanted: true,
            existence: true,
            dateHarvest: true,
            status: true,
            farmer: {
                select: farmerSelectedAttribute,
            },
        },
    });
});
exports.listOfProduction = listOfProduction;
const getSingleProduction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.production.findUnique({
        where: {
            id,
        },
        include: {
            farmer: true,
            harvests: true,
        },
    });
});
exports.getSingleProduction = getSingleProduction;
const createProduction = (production) => __awaiter(void 0, void 0, void 0, function* () {
    const { datePlanted, cropPlanted, areaPlanted, existence, dateHarvest, status, farmerId, } = production;
    return db_server_1.prisma.production.create({
        data: {
            datePlanted,
            cropPlanted,
            areaPlanted,
            existence,
            dateHarvest,
            status,
            farmerId,
        },
        select: {
            id: true,
            datePlanted: true,
            cropPlanted: true,
            areaPlanted: true,
            existence: true,
            dateHarvest: true,
            status: true,
            farmer: {
                select: farmerSelectedAttribute,
            },
        },
    });
});
exports.createProduction = createProduction;
const updateProduction = (production, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { datePlanted, cropPlanted, areaPlanted, existence, dateHarvest, status, farmerId, } = production;
    return db_server_1.prisma.production.update({
        where: {
            id,
        },
        data: {
            datePlanted,
            cropPlanted,
            areaPlanted,
            existence,
            dateHarvest,
            status,
            farmerId,
        },
        select: {
            id: true,
            datePlanted: true,
            cropPlanted: true,
            areaPlanted: true,
            existence: true,
            dateHarvest: true,
            status: true,
            farmer: {
                select: farmerSelectedAttribute,
            },
        },
    });
});
exports.updateProduction = updateProduction;
const deleteProduction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.prisma.production.delete({
        where: {
            id,
        },
    });
});
exports.deleteProduction = deleteProduction;
//# sourceMappingURL=production.service.js.map