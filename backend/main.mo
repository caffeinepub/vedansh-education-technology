import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type QuizScore = {
    subject : Text;
    score : Nat;
    timestamp : Nat;
  };

  public type Student = {
    name : Text;
    phoneNumber : Text;
    streakCount : Nat;
    quizScores : List.List<QuizScore>;
    badges : List.List<Text>;
  };

  public type StudentView = {
    name : Text;
    phoneNumber : Text;
    streakCount : Nat;
    quizScores : [QuizScore];
    badges : [Text];
  };

  module Student {
    public func compareByStreakCount(student1 : Student, student2 : Student) : Order.Order {
      Int.compare(student2.streakCount, student1.streakCount); // Descending order
    };
    public func toView(student : Student) : StudentView {
      {
        name = student.name;
        phoneNumber = student.phoneNumber;
        streakCount = student.streakCount;
        quizScores = student.quizScores.toArray();
        badges = student.badges.toArray();
      };
    };
  };

  let students = Map.empty<Text, Student>();

  public shared ({ caller }) func addStudent(name : Text, phoneNumber : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add students");
    };
    if (students.containsKey(phoneNumber)) {
      Runtime.trap("Student already exists");
    };
    let newStudent : Student = {
      name;
      phoneNumber;
      streakCount = 0;
      quizScores = List.empty<QuizScore>();
      badges = List.empty<Text>();
    };
    students.add(phoneNumber, newStudent);
  };

  public query ({ caller }) func getStudent(phoneNumber : Text) : async ?StudentView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get student data");
    };
    switch (students.get(phoneNumber)) {
      case (null) { null };
      case (?student) { ?Student.toView(student) };
    };
  };

  public shared ({ caller }) func updateStreak(phoneNumber : Text, newStreak : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update streaks");
    };
    switch (students.get(phoneNumber)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let updatedStudent = { student with streakCount = newStreak };
        students.add(phoneNumber, updatedStudent);
      };
    };
  };

  public shared ({ caller }) func saveQuizScore(phoneNumber : Text, subject : Text, score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save quiz scores");
    };
    switch (students.get(phoneNumber)) {
      case (null) { Runtime.trap("Student not found") };
      case (?student) {
        let newQuizScore : QuizScore = {
          subject;
          score;
          timestamp = 0;
        };
        student.quizScores.add(newQuizScore);
        students.add(phoneNumber, student);
      };
    };
  };

  public query ({ caller }) func getLeaderboard() : async [StudentView] {
    students.values().toArray().sort(Student.compareByStreakCount).map<Student, StudentView>(Student.toView);
  };
};
