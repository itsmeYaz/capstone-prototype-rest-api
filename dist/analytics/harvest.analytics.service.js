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
exports.getYieldTrendsByCrop = void 0;
const db_server_1 = require("../utils/db.server");
const getYieldTrendsByCrop = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all harvests with their associated crop type
    const harvests = yield db_server_1.prisma.harvest.findMany({
        select: {
            id: true,
            date: true,
            quantity: true,
            productionId: true,
            Production: true, // Include Production data
        },
    });
    // Group by date and crop type and calculate total quantity
    const yieldTrends = harvests.reduce((acc, harvest) => {
        const date = harvest.date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD' format
        const cropType = harvest.Production.cropPlanted;
        if (!acc[date]) {
            acc[date] = {};
        }
        if (!acc[date][cropType]) {
            acc[date][cropType] = 0;
        }
        acc[date][cropType] += harvest.quantity;
        return acc;
    }, {});
    return yieldTrends;
});
exports.getYieldTrendsByCrop = getYieldTrendsByCrop;
//# sourceMappingURL=harvest.analytics.service.js.map