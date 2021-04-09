"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var interface_1 = require("./interface");
var sls_1 = __importDefault(require("./utils/sls"));
var SlsCompoent = /** @class */ (function () {
    function SlsCompoent() {
    }
    SlsCompoent.prototype.getCredentials = function (credentials, provider, accessAlias) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Obtain the key configuration, whether the key needs to be obtained separately: " + lodash_1.default.isEmpty(credentials));
                        if (interface_1.isCredentials(credentials)) {
                            return [2 /*return*/, credentials];
                        }
                        return [4 /*yield*/, core_1.getCredential(provider, accessAlias)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlsCompoent.prototype.create = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, credentials, properties, sls;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug('Create sls start...');
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        properties = inputs.Properties;
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        sls = new sls_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, sls.create(properties)];
                    case 2:
                        _b.sent();
                        this.logger.debug('Create sls success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    SlsCompoent.prototype.delete = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectName, provider, accessAlias, credentials, properties, sls;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.debug('Delete sls start...');
                        _a = inputs.Project, projectName = _a.ProjectName, provider = _a.Provider, accessAlias = _a.AccessAlias;
                        this.logger.debug("[" + projectName + "] inputs params: " + JSON.stringify(inputs));
                        return [4 /*yield*/, this.getCredentials(inputs.Credentials, provider, accessAlias)];
                    case 1:
                        credentials = _b.sent();
                        properties = inputs.Properties;
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        sls = new sls_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, sls.deleteProject(properties.project)];
                    case 2:
                        _b.sent();
                        this.logger.debug('Delete sls success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], SlsCompoent.prototype, "logger", void 0);
    return SlsCompoent;
}());
exports.default = SlsCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0U7QUFDeEUsa0RBQXVCO0FBQ3ZCLHVDQUFxQztBQUNyQyx5Q0FBdUU7QUFDdkUsb0RBQThCO0FBRTlCO0lBQUE7SUEwREEsQ0FBQztJQXZETyxvQ0FBYyxHQUFwQixVQUNFLFdBQThCLEVBQzlCLFFBQWdCLEVBQ2hCLFdBQW9COzs7Ozt3QkFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ysb0ZBQWtGLGdCQUFDLENBQUMsT0FBTyxDQUN6RixXQUFXLENBQ1YsQ0FDSixDQUFDO3dCQUNGLElBQUkseUJBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTs0QkFDOUIsc0JBQU8sV0FBVyxFQUFDO3lCQUNwQjt3QkFDTSxxQkFBTSxvQkFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFBQTs0QkFBakQsc0JBQU8sU0FBMEMsRUFBQzs7OztLQUNuRDtJQUVLLDRCQUFNLEdBQVosVUFBYSxNQUFNOzs7Ozs7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBRW5DLEtBSUYsTUFBTSxDQUFDLE9BQU8sRUFISCxXQUFXLGlCQUFBLEVBQ2QsUUFBUSxjQUFBLEVBQ0wsV0FBVyxpQkFBQSxDQUNQO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFJLFdBQVcseUJBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQzt3QkFFM0QscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQWxGLFdBQVcsR0FBRyxTQUFvRTt3QkFDbEYsVUFBVSxHQUFnQixNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRyxDQUFDLENBQUM7d0JBRWpFLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUN0RCxxQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7Ozs7S0FDMUM7SUFFSyw0QkFBTSxHQUFaLFVBQWEsTUFBTTs7Ozs7O3dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUVuQyxLQUlGLE1BQU0sQ0FBQyxPQUFPLEVBSEgsV0FBVyxpQkFBQSxFQUNkLFFBQVEsY0FBQSxFQUNMLFdBQVcsaUJBQUEsQ0FDUDt3QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBSSxXQUFXLHlCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUM7d0JBRTNELHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUFsRixXQUFXLEdBQUcsU0FBb0U7d0JBQ2xGLFVBQVUsR0FBZ0IsTUFBTSxDQUFDLFVBQVUsQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQUcsQ0FBQyxDQUFDO3dCQUVqRSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDdEQscUJBQU0sR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUEzQyxTQUEyQyxDQUFDO3dCQUU1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzs7OztLQUMxQztJQXhEaUI7UUFBakIsY0FBTyxDQUFDLGtCQUFPLENBQUM7OytDQUFpQjtJQXlEcEMsa0JBQUM7Q0FBQSxBQTFERCxJQTBEQztrQkExRG9CLFdBQVcifQ==