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
exports.deleteGeographical = exports.updateGeographical = exports.createGeographical = exports.getGeographical = exports.listGeographical = void 0;
const db_server_1 = require("../utils/db.server");
const listGeographical = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.geographical.findMany({
        select: {
            id: true,
            farmLocation: true,
            farmArea: true,
            farmCategory: true,
            farmer: {
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
            },
        },
    });
});
exports.listGeographical = listGeographical;
const getGeographical = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.prisma.geographical.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            farmLocation: true,
            farmArea: true,
            farmCategory: true,
            farmer: {
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
            },
        },
    });
});
exports.getGeographical = getGeographical;
const createGeographical = (geographical) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmLocation, farmArea, farmCategory, farmerId } = geographical;
    return db_server_1.prisma.geographical.create({
        data: {
            farmLocation,
            farmArea,
            farmCategory,
            farmerId,
        },
        select: {
            id: true,
            farmLocation: true,
            farmArea: true,
            farmCategory: true,
            farmer: {
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
            },
        },
    });
});
exports.createGeographical = createGeographical;
const updateGeographical = (geographical, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmLocation, farmArea, farmCategory, farmerId } = geographical;
    return db_server_1.prisma.geographical.update({
        where: {
            id,
        },
        data: {
            farmLocation,
            farmArea,
            farmCategory,
            farmerId,
        },
        select: {
            id: true,
            farmLocation: true,
            farmArea: true,
            farmCategory: true,
            farmer: {
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
            },
        },
    });
});
exports.updateGeographical = updateGeographical;
const deleteGeographical = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.prisma.geographical.delete({
        where: {
            id,
        },
    });
});
exports.deleteGeographical = deleteGeographical;
//# sourceMappingURL=geographical.service.js.map