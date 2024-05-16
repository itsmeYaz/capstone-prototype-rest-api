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
exports.deleteFarmer = exports.updateFarmer = exports.createFarmer = exports.getFarmer = exports.listFarmers = void 0;
const db_server_1 = require("../utils/db.server");
const listFarmers = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.farmer.findMany({
        select: {
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
        },
    });
});
exports.listFarmers = listFarmers;
const getFarmer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.farmer.findUnique({
        where: {
            id: id,
        },
        include: {
            geographical: true, // Include Geographical data
            production: true, // Include Production data
        },
    });
});
exports.getFarmer = getFarmer;
const createFarmer = (farmer) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, middlename, lastname, birthdate, gender, municipality, baranggay, sitio, phoneNumber, } = farmer;
    // const birthdateISO = new Date(birthdate).toISOString()
    return db_server_1.prisma.farmer.create({
        data: {
            firstname,
            middlename,
            lastname,
            birthdate,
            gender,
            municipality,
            baranggay,
            sitio,
            phoneNumber,
        },
        select: {
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
        },
    });
});
exports.createFarmer = createFarmer;
const updateFarmer = (farmer, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, middlename, lastname, birthdate, gender, municipality, baranggay, sitio, phoneNumber, } = farmer;
    // const birthdateISO = new Date(birthdate).toISOString()
    return db_server_1.prisma.farmer.update({
        where: {
            id,
        },
        data: {
            firstname,
            middlename,
            lastname,
            birthdate,
            gender,
            municipality,
            baranggay,
            sitio,
            phoneNumber,
        },
        select: {
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
        },
    });
});
exports.updateFarmer = updateFarmer;
const deleteFarmer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.prisma.farmer.delete({
        where: {
            id,
        },
    });
});
exports.deleteFarmer = deleteFarmer;
//# sourceMappingURL=farmer.service.js.map