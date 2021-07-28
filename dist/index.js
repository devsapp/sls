"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = __importDefault(require("./common/base"));
var constant_1 = require("./constant");
var stdout_formatter_1 = __importDefault(require("./common/stdout-formatter"));
var sls_1 = __importDefault(require("./sls"));
var logs_1 = __importDefault(require("./logs"));
var lodash_1 = __importDefault(require("lodash"));
var SlsCompoent = /** @class */ (function (_super) {
    __extends(SlsCompoent, _super);
    function SlsCompoent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlsCompoent.prototype.create = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, sls, logstores;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug('Create sls start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs.props));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData === null || commandData === void 0 ? void 0 : commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getCredential(inputs.credentials, (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credentials = _d.sent();
                        core_1.reportComponent(constant_1.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'create',
                        });
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _d.sent();
                        properties = inputs.props;
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        sls = new sls_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, sls.create(properties)];
                    case 3:
                        _d.sent();
                        logstores = lodash_1.default.isArray(properties.logstore) ? properties.logstore.map(function (_a) {
                            var name = _a.name;
                            return name;
                        }) : properties.logstore;
                        _super.prototype.__report.call(this, {
                            name: 'sls',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: {
                                region: properties.regionId,
                                project: properties.project,
                                logstore: logstores,
                            },
                        });
                        this.logger.debug('Create sls success.');
                        return [2 /*return*/, inputs.props];
                }
            });
        });
    };
    SlsCompoent.prototype.delete = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, commandData, credentials, properties, sls;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug('Delete sls start...');
                        this.logger.debug("inputs params: " + JSON.stringify(inputs === null || inputs === void 0 ? void 0 : inputs.props));
                        apts = { boolean: ['help'], alias: { help: 'h' } };
                        commandData = core_1.commandParse({ args: inputs.args }, apts);
                        this.logger.debug("Command data is: " + JSON.stringify(commandData));
                        if ((_a = commandData === null || commandData === void 0 ? void 0 : commandData.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.help(constant_1.HELP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getCredential(inputs.credentials, (_b = inputs.project) === null || _b === void 0 ? void 0 : _b.access)];
                    case 1:
                        credentials = _d.sent();
                        core_1.reportComponent(constant_1.CONTEXT_NAME, {
                            uid: credentials.AccountID,
                            command: 'delete',
                        });
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 2:
                        _d.sent();
                        properties = inputs.props;
                        this.logger.debug("Properties values: " + JSON.stringify(properties) + ".");
                        sls = new sls_1.default(properties.regionId, credentials);
                        return [4 /*yield*/, sls.deleteProject(properties.project)];
                    case 3:
                        _d.sent();
                        _super.prototype.__report.call(this, {
                            name: 'sls',
                            access: (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access,
                            content: {
                                region: properties.regionId,
                                project: '',
                                logstore: '',
                            },
                        });
                        this.logger.debug('Delete sls success.');
                        return [2 /*return*/];
                }
            });
        });
    };
    SlsCompoent.prototype.logs = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apts, comParse, credentials, props, logsClient, historyLogs;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.logger.debug("inputs params: " + JSON.stringify(inputs.props) + ", args: " + inputs.args);
                        apts = {
                            boolean: ['tail', 'help'],
                            string: ['request-id', 'keyword', 'topic', 'query', 'region', 'project', 'logstore'],
                            alias: { tail: 't', 'start-time': 's', 'end-time': 'e', keyword: 'k', 'request-id': 'r', help: 'h' },
                        };
                        return [4 /*yield*/, core_1.commandParse({ args: inputs.args }, apts)];
                    case 1:
                        comParse = _d.sent();
                        this.logger.debug("commandParse response is: " + JSON.stringify(comParse));
                        if ((_a = comParse.data) === null || _a === void 0 ? void 0 : _a.help) {
                            core_1.reportComponent('sls', { uid: (_b = inputs.credentials) === null || _b === void 0 ? void 0 : _b.AccountID, command: 'logs' });
                            return [2 /*return*/, core_1.help(constant_1.LOGS_HELP)];
                        }
                        return [4 /*yield*/, this.getCredential(inputs.credentials, (_c = inputs.project) === null || _c === void 0 ? void 0 : _c.access)];
                    case 2:
                        credentials = _d.sent();
                        core_1.reportComponent('sls', { uid: credentials.AccountID, command: 'logs' });
                        return [4 /*yield*/, logs_1.default.getInputs(inputs.props || {}, comParse.data || {})];
                    case 3:
                        props = _d.sent();
                        this.logger.debug("handler props is: " + JSON.stringify(props));
                        logsClient = new logs_1.default(props.regionId, credentials);
                        if (!props.tail) return [3 /*break*/, 5];
                        return [4 /*yield*/, logsClient.realtime(props.projectName, props.logStoreName, props.topic, props.query)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, logsClient.history(props)];
                    case 6:
                        historyLogs = _d.sent();
                        logsClient.printLogs(historyLogs);
                        _d.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SlsCompoent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete(inputs)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlsCompoent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.create(inputs)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlsCompoent.prototype.getCredential = function (credentials, access) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!lodash_1.default.isEmpty(credentials)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core_1.getCredential(access)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, credentials];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], SlsCompoent.prototype, "logger", void 0);
    return SlsCompoent;
}(base_1.default));
exports.default = SlsCompoent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTZHO0FBQzdHLHVEQUFpQztBQUNqQyx1Q0FBb0U7QUFFcEUsK0VBQXdEO0FBQ3hELDhDQUF3QjtBQUN4QixnREFBMEI7QUFDMUIsa0RBQXVCO0FBRXZCO0lBQXlDLCtCQUFJO0lBQTdDOztJQWlJQSxDQUFDO0lBOUhPLDRCQUFNLEdBQVosVUFBYSxNQUFlOzs7Ozs7O3dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQzt3QkFFOUQsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ25ELFdBQVcsR0FBUSxtQkFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFHLENBQUMsQ0FBQzt3QkFDckUsVUFBSSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSwwQ0FBRSxJQUFJLEVBQUU7NEJBQzNCLFdBQUksQ0FBQyxlQUFJLENBQUMsQ0FBQzs0QkFDWCxzQkFBTzt5QkFDUjt3QkFFbUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsV0FBVyxRQUFF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