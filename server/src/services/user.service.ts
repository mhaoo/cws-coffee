import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../db/models/user.model";
import { BadRequestError, ConflictError } from "../core";
import config from "../configs";
import AuthService from "./auth.service";
import { getObjectFields } from "../utils";
import { generateKeyPairSync, randomBytes } from "crypto";
import { Transaction } from "sequelize";

const { saltRounds } = config.security;

export default class UserService {}
