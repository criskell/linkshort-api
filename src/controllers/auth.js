import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sequelize from "../database.js";

const { models } = sequelize;

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: {
      email
    },
    attributes: [
      "id",
      "password"
    ]
  });

  if (! user) return res.status(400).json({
    errors: {
      email: "Nenhum usuário foi encontrado para este e-mail."
    }
  });

  const authenticated = await bcrypt.compare(password, user.password);

  if (!authenticated) return res.status(400).json({
    errors: {
      password: "Senha inválida."
    }    
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res.json({ token });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailUnique = !! await models.User.count({
    where: {
      email
    }
  });

  if (isEmailUnique) return res.status(400).json({
    errors: {
      email: "O e-mail não é único."
    }
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await models.User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({ message: "Usuário criado com sucesso." });
};