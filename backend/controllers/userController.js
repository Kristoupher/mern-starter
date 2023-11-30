import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    add a user
// @route   POST /api/users
// @access  Public
const addUser = asyncHandler(async (req, res) => {
    const { lastname, firstname, email, password, isAdmin } = req.body;

    if(!lastname || !firstname || !email || !password) {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs');
    } else {

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('Adresse mail déjà utilisée');
        }

        const user = new User({
            lastname,
            firstname,
            email,
            password,
            isAdmin
        });

        const createdUser = await user.save();

        if(createdUser) {
            generateToken(res, createdUser._id);

            res.status(201).json({
                _id: createdUser._id,
                lastname: createdUser.lastname,
                firstname: createdUser.firstname,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
            });
        } else {
            res.status(400);
            throw new Error('Données invalides');
        }
    }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error('Veuillez saisir une adresse mail et un mot de passe');
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Adresse mail ou mot de passe invalide');
    }

});

// @desc    Logout user & clear cookie
// @route   GET /api/users/logout
// @access  public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ success: "Déconnexion réussie" });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ lastname: 1 });
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const { lastname, firstname, email, isAdmin } = req.body;
    const { id } = req.params;

    if(!lastname || !firstname || !email) {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs');
    }

    const user = await User.findById(id);

    if(user) {
        user.lastname = lastname;
        user.firstname = firstname;
        user.email = email;
        user.isAdmin = isAdmin;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            lastname: updatedUser.lastname,
            firstname: updatedUser.firstname,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }

});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        await user.deleteOne({ _id: user._id });
        res.json({ message: 'Utilisateur supprimé' });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

export { addUser, getUsers, getUserById, updateUser, deleteUser, authUser, logoutUser };